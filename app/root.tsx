import { useState } from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import mainStyles from '~/styles/main.css?url';
import ClientOnly from '~/components/client-only';
import Header from '~/components/header';
// import PointerFollower from '~/components/pointer-follower';
import Sidebar from '~/components/sidebar';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }];
};

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function toggleSidebar(state: boolean) {
		if (state === true || state === false) {
			setSidebarOpen(state);
		} else {
			setSidebarOpen(!sidebarOpen);
		}
	}

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
					<ClientOnly>
						<Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
						{/* <PointerFollower /> */}
						<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
						<Outlet />
					</ClientOnly>
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
