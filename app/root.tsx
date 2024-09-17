import { useEffect, useRef, useState } from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import PointerFollowerProvider from '~/context/pointer-follower-context';
import mainStyles from '~/styles/main.css?url';
import ClientOnly from '~/components/client-only';
import Header from '~/components/header';
import PointerFollower from '~/components/pointer-follower';
import Sidebar from '~/components/sidebar';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: mainStyles }];
};

export default function App() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const scrollContainerRef = useRef<HTMLElement>(null);

	function toggleSidebar(state: boolean) {
		if (state === true || state === false) {
			setSidebarOpen(state);
		} else {
			setSidebarOpen(!sidebarOpen);
		}
	}

	useEffect(() => {
		async function getLocomotiveScroll() {
			const LocomotiveScroll = (await import('locomotive-scroll')).default;

			const scroll = new LocomotiveScroll({
				el: scrollContainerRef.current!,
				smooth: true,
				direction: 'vertical',
			});
			return scroll;
		}

		const scroll = getLocomotiveScroll();

		return () => {
			scroll.then((s) => s.destroy());
		};
	}, []);

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
					<PointerFollowerProvider>
						<main ref={scrollContainerRef} data-scroll-container>
							<Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
							<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
							<Outlet />
							<PointerFollower />
						</main>
					</PointerFollowerProvider>
				</ClientOnly>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
