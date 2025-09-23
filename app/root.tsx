import { type LinksFunction } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import mainStyles from '~/styles/main.css?url'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }]
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>

			<body>
				<main>
					<Outlet />
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
