#!/usr/bin/env bash
set -euo pipefail

cd /Users/rsantos/Coding/ryan-santos-portfolio

# Only process unchecked tasks: "* [ ] ..."
grep '^\* \[ \]' todo.md | while read -r line; do
  # Extract the title: everything before " (labels: ...)"
  title="$(sed -E 's/^\* \[ \] (.+) \(labels: .*\)$/\1/' <<<"$line")"

  # Extract labels: the part inside "(labels: ...)" and normalize commas/spaces
  labels_raw="$(sed -E 's/^.*\(labels: (.+)\)$/\1/' <<<"$line")"
  labels="$(echo "$labels_raw" | sed 's/, */,/g')"  # "a, b" -> "a,b"

  echo "Creating issue: '$title' with labels: $labels"

  gh issue create \
    --title "$title" \
    --body "Imported from todo.md" \
    --label "$labels"
done
