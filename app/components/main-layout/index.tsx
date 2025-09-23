import clsx from 'clsx'
import Header from '~/components/header'
import Footer from '~/components/footer'

const ns = 'main-layout'

type MainLayoutProps = {
	children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
	const rootClassName = clsx(ns)

	return (
		<main className={rootClassName}>
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default MainLayout
