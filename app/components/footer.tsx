import clsx from 'clsx'
import styles from '~/styles/components/footer.module.scss'
import { GlobalFooter } from '~/graphql/__generated/sdk'

const formatCopyrightText = (text: string) => {
	return text.replace('{{year}}', new Date().getFullYear().toString())
}

type FooterProps = {
	data?: GlobalFooter
}

export default function Footer({ data }: FooterProps) {
	return (
		<footer className={styles.footer}>
			<div className={clsx('container', styles.container)}>
				{data?.copyRightText && (
					<p className="body-2">
						{formatCopyrightText(data.copyRightText)}
					</p>
				)}
			</div>
		</footer>
	)
}
