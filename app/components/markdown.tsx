import Link from '~/components/link'
import clsx from 'clsx'
import styles from '~/styles/components/rich-text.module.scss'
import CodeBlock from '~/components/code-block'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ClientOnly from '~/components/client-only'

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
			<ClientOnly>
				<ReactMarkdown
					components={{
						a({ children, href, ...props }) {
							if (!href) {
								return <span>{children}</span>
							}

							return (
								<Link inline to={href} {...props}>
									{children}
								</Link>
							)
						},
						code({ children, className: codeClassName, node, ...props }) {
							const match = /language-(\w+)/.exec(codeClassName || '')
							const codeString = String(children).replace(/\n$/, '')

							if (match) {
								return (
									<CodeBlock
										language={match[1]}
										value={codeString}
										{...props}
									/>
								)
							}

							return (
								<CodeBlock
									language="plaintext"
									value={codeString}
									{...props}
								/>
							)
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
			</ClientOnly>
		</div>
	)
}
