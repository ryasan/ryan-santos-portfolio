export function getClass (ns: string, el?: string) {
  if (el) {
    return `${ns}__${el}`;
  }
  return ns;
};
