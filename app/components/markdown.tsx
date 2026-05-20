import CodeBlock from '~/components/code-block'
import Link from '~/components/link'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import remarkGfm from 'remark-gfm'
import styles from '~/styles/components/rich-text.module.scss'

type MarkdownProps = {
	className?: string
	content: string
}

export default function Markdown({ className, content }: MarkdownProps) {
	if (!content.trim()) {
		return null
	}

	return (
		<div className={clsx(styles.richText, className)}>
			<ReactMarkdown
				components={{
					a({ children, href }) {
						if (!href) {
							return <span>{children}</span>
						}

						return (
							<Link inline to={href}>
								{children}
							</Link>
						)
					},
					code({ children, className: codeClassName }) {
						const match = /language-(\w+)/.exec(codeClassName || '')
						const codeString = String(children).replace(/\n$/, '')

						if (match) {
							return <CodeBlock language={match[1]} value={codeString} />
						}

						return <CodeBlock language="plaintext" value={codeString} />
					},
					pre({ children }) {
						return <>{children}</>
					},
					table({ children }) {
						return (
							<div className={styles.tableWrapper}>
								<table>{children}</table>
							</div>
						)
					},
				}}
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}
