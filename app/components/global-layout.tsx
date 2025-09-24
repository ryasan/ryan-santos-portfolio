import Header from '~/components/header'
import Footer from '~/components/footer'

type GlobalLayoutProps = {
	children: React.ReactNode
}

function GlobalLayout({ children }: GlobalLayoutProps) {
	return (
		<main>
			<Header />
			{children}
			<Footer />
		</main>
	)
}

export default GlobalLayout
