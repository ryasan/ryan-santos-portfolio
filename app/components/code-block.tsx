import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	oneLight,
	twilight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from '~/hooks'

const detectLanguage = (code: string) => {
	const trimmedCode = code.trim()

	if (
		/function\s+\w+\s*\(.*\)\s*:\s*\w+/.test(trimmedCode) ||
		/:\s*(string|number|boolean)/.test(trimmedCode)
	) {
		return 'typescript'
	}

	if (
		/import\s.+from\s['"].+['"]/.test(trimmedCode) ||
		/export\s(default|const|function)/.test(trimmedCode)
	) {
		return 'javascript'
	}

	if (
		/<[A-Za-z]+\s?[^>]*>/.test(trimmedCode) &&
		/<\/[A-Za-z]+>/.test(trimmedCode)
	) {
		return 'html'
	}

	if (/^\s*\.(\w+)\s*\{[^}]+\}/m.test(trimmedCode)) {
		return 'css'
	}

	if (/class\s+\w+/.test(trimmedCode) && /def\s+\w+/.test(trimmedCode)) {
		return 'python'
	}

	if (/SELECT\s+.+\s+FROM/i.test(trimmedCode)) {
		return 'sql'
	}

	return 'plaintext'
}

type CodeBlockProps = {
	code?: React.ReactNode
}

export default function CodeBlock({ code }: CodeBlockProps) {
	const language = detectLanguage(String(code))
	const theme = useTheme()
	const style = theme === 'dark' ? twilight : oneLight

	return (
		<SyntaxHighlighter language={language} style={style}>
			{String(code)}
		</SyntaxHighlighter>
	)
}
