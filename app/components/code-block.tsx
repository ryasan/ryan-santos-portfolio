import clsx from 'clsx'
import styles from '~/styles/components/code-block.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { twilight, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'
import { useTheme } from '~/hooks'

/**
 * Triple backticks are used to define a code block in Markdown.
 * This function extracts the language and the code from the string.
 *
 * @returns {Object} An object containing the parsed code and the language
 * @property {string} parsedCode - The parsed code
 * @property {string} language - The language of the code
 *
 * @example
 * ```javascript
 * console.log('Hello, world!')
 * ```
 */
const parseCodeString = (code: string) => {
	const trimmedCode = code.trim()
	const language = trimmedCode.match(/```(\w+)/)?.[1] || 'plaintext'
	const parsedCode = trimmedCode.replace(/^```(\w+)?|```(\w+)?$/g, '').trim()

	return { parsedCode, language }
}

type CodeBlockProps = {
	code?: React.ReactNode
}

export default function CodeBlock({ code }: CodeBlockProps) {
	const [copySuccess, setCopySuccess] = useState(false)
	const { parsedCode, language } = parseCodeString(String(code))

	// If it's a short string meant to be used inline, just return the code span
	if (language === 'plaintext') {
		return (
			<code className={clsx(styles.codespan, 'codespan')}>
				{String(parsedCode)}
			</code>
		)
	}

	const theme = useTheme()
	const style = theme === 'dark' ? twilight : prism

	const copyToClipboard = () => {
		if (parsedCode) {
			navigator.clipboard.writeText(parsedCode)
			setCopySuccess(true)
			setTimeout(() => {
				setCopySuccess(false)
			}, 1000)
		}
	}

	return (
		<div className={styles.container}>
			<button
				className={styles.copyButton}
				onClick={copyToClipboard}
				title="Copy to clipboard"
			>
				{copySuccess ? 'Copied' : 'Copy'}
			</button>
			<SyntaxHighlighter
				className={styles.codeBlock}
				language={language}
				style={style}
			>
				{String(parsedCode)}
			</SyntaxHighlighter>
		</div>
	)
}
