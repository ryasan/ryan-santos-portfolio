import Footer from '~/components/footer'
import Header from '~/components/header'
import styles from '~/styles/components/global-layout.module.scss'
import { GlobalHeader, GlobalFooter } from '~/types'

type GlobalLayoutProps = {
	children: React.ReactNode
	data?: {
		headerData?: GlobalHeader
		footerData?: GlobalFooter
	}
}

export default function GlobalLayout({
	children,
	data,
}: GlobalLayoutProps) {
	return (
		<main className={styles.main}>
			<Header data={data?.headerData} />
			{children}
			<Footer data={data?.footerData} />
		</main>
	)
}
