import { type LinksFunction } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import ClientOnly from '~/components/client-only'
import Providers from '~/components/providers'
import MainLayout from '~/components/main-layout'
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
				<ClientOnly>
					<Providers>
						<MainLayout>
							<Outlet />
						</MainLayout>
					</Providers>
				</ClientOnly>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
