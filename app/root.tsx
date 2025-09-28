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
import { client } from '~/services/contentful.server'
import { getTheme } from '~/services/theme.server'
import { type Theme } from '~/types'
import { useLoaderData } from '@remix-run/react'
import { useTheme } from '~/hooks'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const headerData = await client.getGlobalHeader()
	const footerData = await client.getGlobalFooter()

	const requestInfo = {
		hints: getHints(request),
		userPrefs: {
			theme: getTheme(request),
		},
	}

	return json({ headerData, footerData, requestInfo })
}

type DocumentProps = {
	children: React.ReactNode
	theme?: Theme
}

function Document({ children, theme = 'dark' }: DocumentProps) {
	const data = useLoaderData<typeof loader>()

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
				<GlobalLayout data={data}>{children}</GlobalLayout>
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
			<div>Something went wrong while loading the page</div>
		</Document>
	)
}
