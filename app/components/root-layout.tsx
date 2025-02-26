import clsx from 'clsx'
import { useState } from 'react'

import BurgerMenu from '~/components/burger-menu'
import Header from '~/components/header'
import PointerFollower from '~/components/pointer-follower'
import Sidebar from '~/components/sidebar'

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	function toggleSidebar(state: boolean) {
		if (state === true || state === false) {
			setSidebarOpen(state)
		} else {
			setSidebarOpen(!sidebarOpen)
		}
	}

	return (
		<>
			<PointerFollower />
			<Header />
			<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
			{children}
			<BurgerMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
		</>
	)
}
