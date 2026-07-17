import { type GlobalFooter } from '~/graphql/__generated/sdk'

const ns = 'footer'

const formatCopyrightText = (text: string) => {
	return text.replace('{{year}}', new Date().getFullYear().toString())
}

type FooterProps = {
	data?: GlobalFooter
}

export default function Footer({ data }: FooterProps) {
	return (
		<footer className={ns} id="global-footer">
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
