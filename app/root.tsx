import { type LinksFunction } from '@remix-run/node'
// import { useLocation } from '@remix-run/react'
// import { AnimatePresence, motion } from 'framer-motion'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import { useEffect } from 'react'

import ClientOnly from '~/components/client-only'
import Providers from '~/components/providers'
import RootLayout from '~/components/root-layout'
import mainStyles from '~/styles/main.css?url'
import { noop } from '~/utils'

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }]
}

export default function App() {
	// const location = useLocation()

	useEffect(() => {
		// Bootstrap vendors after load
		async function importVendors() {
			// @Todo: Load this using client-only methods
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
							<RootLayout>
								{/* Animated routes. */}
								{/* <AnimatePresence mode="wait" initial={false}>
									<motion.div
										key={location.pathname}
										initial={{ x: '-10%', opacity: 0 }}
										animate={{ x: '0', opacity: 1 }}
										exit={{ y: '-10%', opacity: 0 }}
										transition={{ duration: 0.3 }}
									> */}
								<Outlet />
								{/* </motion.div>
								</AnimatePresence> */}
							</RootLayout>
						</main>
					</Providers>
				</ClientOnly>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
