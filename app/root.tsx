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
import Header from '~/components/header';
import PointerFollower from '~/components/pointer-follower';
import Sidebar from '~/components/sidebar';

export const links: LinksFunction = () => {
	return [
		// {
		// 	rel: 'stylesheet',
		// 	href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
		// },
		// {
		// 	rel: 'stylesheet',
		// 	href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap',
		// },
		{ rel: 'stylesheet', href: mainStyles },
	];
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
					<Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
					<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
					<Outlet />
					<PointerFollower mixBlendModeEnabled />
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
