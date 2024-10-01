import { type LinksFunction } from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import { useEffect, useState } from 'react'

import BurgerMenu from '~/components/burger-menu'
import ClientOnly from '~/components/client-only'
import Header from '~/components/header'
import PointerFollower from '~/components/pointer-follower'
import Providers from '~/components/providers'
import Sidebar from '~/components/sidebar'
import mainStyles from '~/styles/main.css?url'
import { noop } from '~/utils'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }]
}

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	function toggleSidebar(state: boolean) {
		if (state === true || state === false) {
			setSidebarOpen(state)
		} else {
			setSidebarOpen(!sidebarOpen)
		}
	}

	useEffect(() => {
		async function importVendors() {
			// Bootstrap vendors after load.
			await import('~/vendors')
		}

		importVendors().then(noop).catch(noop)
	}, [])

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
						<main id="scroll-container" data-scroll-container>
							<PointerFollower />
							<Header />
							<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
							<Outlet />
							<BurgerMenu
								sidebarOpen={sidebarOpen}
								toggleSidebar={toggleSidebar}
							/>
						</main>
					</Providers>
				</ClientOnly>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
