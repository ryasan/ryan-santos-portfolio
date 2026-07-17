import clsx from 'clsx'
import { CopySimpleIcon } from '~/components/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	atomDark,
	oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useState } from 'react'
import { useTheme } from '~/hooks'

const ns = 'code-block'

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

	return { language, parsedCode }
}

type CodeBlockProps = {
	code?: React.ReactNode
	language?: string
	value?: string
}

export default function CodeBlock({
	code,
	language: languageProp,
	value,
}: CodeBlockProps) {
	const [copySuccess, setCopySuccess] = useState(false)
	const { language, parsedCode } =
		languageProp != null && value != null
			? { language: languageProp, parsedCode: value }
			: parseCodeString(String(code))

	const [theme] = useTheme()
	const style = theme === 'dark' ? atomDark : oneLight

	// If it's a short string meant to be used inline, just return the code span
	if (language === 'plaintext') {
		return (
			<code className={clsx(`${ns}__codespan`)}>{String(parsedCode)}</code>
		)
	}

	const copyToClipboard = () => {
		if (parsedCode) {
			void navigator.clipboard.writeText(parsedCode)
			setCopySuccess(true)
			setTimeout(() => {
				setCopySuccess(false)
			}, 2000)
		}
	}

	return (
		<div className={ns}>
			<button
				className={`${ns}__copy-button`}
				onClick={copyToClipboard}
				title="Copy to clipboard"
			>
				{copySuccess ? (
					'Copied'
				) : (
					<CopySimpleIcon className={`${ns}__copy-icon`} />
				)}
			</button>
			<SyntaxHighlighter
				className={`${ns}__highlighter`}
				codeTagProps={{
					style: {
						fontFamily: 'Fira Code, monospace',
						fontSize: '1em',
					},
				}}
				customStyle={{
					fontFamily: 'Fira Code, monospace',
					fontSize: '1em',
				}}
				language={language}
				style={style}
			>
				{String(parsedCode)}
			</SyntaxHighlighter>
		</div>
	)
}
