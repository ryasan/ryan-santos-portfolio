import clsx from 'clsx'
import Header from '~/components/header'
import Footer from '~/components/footer'

const ns = 'global-layout'

type GlobalLayoutProps = {
	children: React.ReactNode
}

function GlobalLayout({ children }: GlobalLayoutProps) {
	const rootClassName = clsx(ns)

	return (
		<main className={rootClassName}>
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default GlobalLayout
