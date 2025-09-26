import Footer from '~/components/footer'
import Header from '~/components/header'
import styles from '~/styles/components/global-layout.module.scss'

type GlobalLayoutProps = {
	children: React.ReactNode
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
	return (
		<main className={styles.main}>
			<Header />
			{children}
			<Footer />
		</main>
	)
}
