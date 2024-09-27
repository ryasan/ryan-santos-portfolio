import clsx from 'clsx'
import SectionLayout from '~/components/section-layout'

const ns = 'footer-section'

export default function FooterSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	return (
		<SectionLayout
			className={rootClassName}
			as="footer"
			cursorColor="inverse"
		>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h2 className={`${ns}__title`}>FOOTER SECTION</h2>
					</div>
				</div>
			</div>
		</SectionLayout>
	)
}
