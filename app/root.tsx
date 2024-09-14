import { useState } from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import Header from './components/header';
import Sidebar from './components/sidebar';

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
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
