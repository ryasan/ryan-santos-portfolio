import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import Header from '~/components/header';
import Sidebar from '~/components/sidebar';
import { useFollowPointer } from '~/hooks/use-follow-pointer';

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pointerFollowerRef = useRef<HTMLDivElement>(null);
	const { x, y } = useFollowPointer(pointerFollowerRef);

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
					<motion.div
						ref={pointerFollowerRef}
						style={{
							x,
							y,
							borderRadius: '50%',
							height: 10,
							width: 10,
							backgroundColor: 'white',
						}}
					/>
				</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
