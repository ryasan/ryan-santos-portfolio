import { useRef, useState } from 'react';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import {
	LocomotiveScrollProvider,
	type LocomotiveScrollProviderProps,
} from 'react-locomotive-scroll';

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
	const scrollContainerRef = useRef(null);

	const locomotiveScrollProps: LocomotiveScrollProviderProps = {
		options: { smooth: true, direction: 'vertical' },
		containerRef: scrollContainerRef,
		watch: [],
	};

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
				<ClientOnly>
					<LocomotiveScrollProvider {...locomotiveScrollProps}>
						<main ref={scrollContainerRef} data-scroll-container>
							<Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
							{/* <PointerFollower /> */}
							<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
							<Outlet />
						</main>
					</LocomotiveScrollProvider>
				</ClientOnly>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
