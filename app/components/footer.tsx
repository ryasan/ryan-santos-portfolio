import { type GlobalFooter } from '~/graphql/__generated/sdk'
import styles from './footer.module.css'


const formatCopyrightText = (text: string) => {
	return text.replace('{{year}}', new Date().getFullYear().toString())
}

type FooterProps = {
	data?: GlobalFooter
}

export default function Footer({ data }: FooterProps) {
	return (
		<footer className={styles.root} id="global-footer">
			<div className="container">
				{data?.copyRightText && (
					<p className="body-2">
						{formatCopyrightText(data.copyRightText)}
					</p>
				)}
			</div>
		</footer>
	)
}
