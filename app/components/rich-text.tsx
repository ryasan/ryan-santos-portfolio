import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import type { Document } from '@contentful/rich-text-types'
import clsx from 'clsx'
import Link from '~/components/link'
import styles from '~/styles/components/rich-text.module.scss'

type RichTextProps = {
	data: Document | any
	className?: string
}

// Custom rendering options (only override what you need to customize)
const renderOptions = {
	renderMark: {
		[MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
		[MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
	},
	renderNode: {
		[BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
			<ul style={{ paddingLeft: '24px', listStyleType: 'disc' }}>{children}</ul>
		),
		[BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
			<ol style={{ paddingLeft: '24px', listStyleType: 'decimal' }}>
				{children}
			</ol>
		),
		[BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
			<blockquote
				style={{
					borderLeft: '4px solid var(--line-color)',
					paddingLeft: '24px',
					fontStyle: 'italic',
					color: 'var(--content-color-2)',
				}}
			>
				{children}
			</blockquote>
		),
		[BLOCKS.HR]: () => (
			<hr
				style={{
					border: 'none',
					borderTop: '1px solid var(--line-color)',
				}}
			/>
		),
		[INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
			<Link to={node.data.uri}>{children}</Link>
		),
		[INLINES.ENTRY_HYPERLINK]: (node: any, children: React.ReactNode) => {
			// Handle links to other Contentful entries
			const entryId = node.data.target.sys.id
			return <Link to={`/entry/${entryId}`}>{children}</Link>
		},
	},
}

function RichText({ data, className }: RichTextProps) {
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

export default RichText
