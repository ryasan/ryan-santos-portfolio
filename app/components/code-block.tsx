import clsx from 'clsx';
import styles from '~/styles/components/code-block.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, twilight, } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from '~/hooks'

const processCodeString = (code: string) => {
	const trimmedCode = code.trim()
	const language = trimmedCode.match(/```(\w+)/)?.[1] || 'plaintext'
	const parsedCode = trimmedCode.replace(/^```(\w+)?|```(\w+)?$/g, '').trim()

	return { parsedCode, language }
}

type CodeBlockProps = {
	code?: React.ReactNode
}

export default function CodeBlock({ code }: CodeBlockProps) {
	const { parsedCode, language } = processCodeString(String(code))
	const theme = useTheme()
	const style = theme === 'dark' ? twilight : oneLight

	// If it's a short string meant to be used inline, just return the string
	if (language === 'plaintext') {
		return (
			<span >
				<code className={clsx(styles.codespan, 'codespan')}>{String(parsedCode)}</code>
			</span>
		)
	}

	return (
		<div className={styles.codeBlock}>
			<SyntaxHighlighter
				language={language}
				style={style}
				className={styles.codeBlock}
			>
				{String(parsedCode)}
			</SyntaxHighlighter>
		</div>
	)
}
