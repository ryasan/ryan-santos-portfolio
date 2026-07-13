import { useState, useEffect } from 'react'
import { ThemeContext } from '~/contexts/theme-context'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from '@remix-run/react'
import {
	json,
	type HeadersFunction,
	type LinksFunction,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import ClientHintScript, { getHints } from '~/components/client-hint-script'
import GlobalLayout from '~/components/global-layout'
import mainStyles from '~/styles/main.css?url'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { generateCacheHeaders, mergeHeaders } from '~/utils'
import { client } from '~/services/contentful.server'
import { gsap } from 'gsap'
import { type Theme } from '~/types'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

export const links: LinksFunction = () => {
	return [{ href: mainStyles, rel: 'stylesheet' }]
}

export const headers: HeadersFunction = mergeHeaders

export async function loader({ request }: LoaderFunctionArgs) {
	const headerData = await client.getGlobalHeader()
	const footerData = await client.getGlobalFooter()

	const requestInfo = {
		hints: getHints(request),
	}

	const tags = [
		headerData?.sys?.id ? `entry-${headerData.sys.id}` : null,
		footerData?.sys?.id ? `entry-${footerData.sys.id}` : null,
		'content-type-globalHeader',
		'content-type-globalFooter',
	].filter((tag): tag is string => tag !== null)

	return json(
		{ footerData, headerData, requestInfo },
		{ headers: generateCacheHeaders(tags) }
	)
}

type DocumentProps = {
	children: React.ReactNode
	theme?: Theme
}

function Document({ children, theme = 'dark' }: DocumentProps) {
	const data = useLoaderData<typeof loader>()

	return (
		<html data-theme={theme} lang="en">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							try {
								var localTheme = localStorage.getItem('theme');
								if (localTheme) {
									document.documentElement.setAttribute('data-theme', localTheme);
								}
							} catch (e) {}
						`,
					}}
				/>
				<ClientHintScript />
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>

			<body className="preload" suppressHydrationWarning>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							setTimeout(function() {
								document.body.classList.remove('preload');
							}, 0);
						`,
					}}
				/>
				<GlobalLayout data={data}>{children}</GlobalLayout>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

function App() {
	const [theme, setTheme] = useState<Theme | null>('dark')

	useEffect(() => {
		const localTheme = localStorage.getItem('theme') as Theme | null
		if (localTheme) {
			setTheme(localTheme)
		}
	}, [])

	return (
		<ThemeContext.Provider value={[theme, setTheme]}>
			<Document theme={theme || 'dark'}>
				<Outlet />
			</Document>
		</ThemeContext.Provider>
	)
}

export default App

export function ErrorBoundary() {
	const error = useRouteError()
	const errorStyles = { color: '#de292c', padding: '1rem' }

	if (isRouteErrorResponse(error)) {
		return (
			<div style={errorStyles}>
				<h1>Error {error.status}</h1>
				<p>{error.data}</p>
			</div>
		)
	}

	if (error instanceof Error) {
		return (
			<div style={errorStyles}>
				<h1>Error</h1>
				<p>{error.message}</p>
			</div>
		)
	}

	return (
		<Document>
			<div>Something went wrong while loading the page</div>
		</Document>
	)
}
