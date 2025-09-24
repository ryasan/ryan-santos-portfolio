import {
	json,
	type LinksFunction,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import ClientHintScript, { getHints } from '~/components/client-hint-script'
import GlobalLayout from '~/components/global-layout'
import mainStyles from '~/styles/main.css?url'
import type { Theme } from '~/types'
import { useTheme } from '~/hooks'
import { getTheme } from '~/services/theme.server'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	return json({
		requestInfo: {
			hints: getHints(request),
			userPrefs: {
				theme: getTheme(request),
			},
		},
	})
}

type DocumentProps = {
	children: React.ReactNode
	theme?: Theme
}

function Document({ children, theme = 'dark' }: DocumentProps) {
	return (
		<html lang="en" data-theme={theme}>
			<head>
				<ClientHintScript />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>

			<body>
				<GlobalLayout>{children}</GlobalLayout>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

function App() {
	const theme = useTheme()

	return (
		<Document theme={theme}>
			<Outlet />
		</Document>
	)
}

export default App

export function ErrorBoundary() {
	return (
		<Document>
			{/* @Todo: Add error UI */}
			<div>Error</div>
		</Document>
	)
}
