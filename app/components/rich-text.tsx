import Link from '~/components/link'
import clsx from 'clsx'
import styles from '~/styles/components/rich-text.module.scss'
import  { type Document, BLOCKS, INLINES, MARKS  } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CodeBlock from '~/components/code-block'

type RichTextProps = {
	className?: string
	data: Document | any
}

// Custom rendering options (only override what you need to customize)
const renderOptions = {
	renderMark: {
		[MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
		[MARKS.CODE]: (text: React.ReactNode) => <CodeBlock code={text} />,
		[MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
	},
	renderNode: {
		[BLOCKS.DOCUMENT]: (node: any, children: React.ReactNode) => {
			return <div>{children}</div>
		},
		[BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
			<ol>{children}</ol>
		),
		[BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
			// If it's a code block, return the content without any wrapping elements
			if (node.content[0]?.marks[0]?.type === MARKS.CODE) {
				return children
			}
			return <p>{children}</p>
		},
		[BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
			<blockquote>{children}</blockquote>
		),
		[BLOCKS.TABLE]: (node: any, children: React.ReactNode) => (
			<div className={styles.tableWrapper}>
				<table>
					<tbody>{children}</tbody>
				</table>
			</div>
		),
		[BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
			<ul>{children}</ul>
		),
		[INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
			// Handle links to other Contentful entries
			const entryId = node.data.target.sys.id
			return <Link to={`/entry/${entryId}`}>{children}</Link>
		},
		[INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
			<Link to={node.data.uri}>{children}</Link>
		),
	},
}

export default function RichText({ className, data }: RichTextProps) {
	// Handle empty or invalid data
	if (!data || !data.nodeType) {
		return null
	}

	return (
		<div className={clsx(styles.richText, className)}>
			{documentToReactComponents(data, renderOptions)}
		</div>
	)
}
