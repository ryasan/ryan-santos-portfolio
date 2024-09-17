import clsx from 'clsx';
import ParallaxLayout from '~/components/parallax-layout';

const ns = 'footer-section';

type FooterSectionProps = {
	id: number | null;
};

export default function FooterSection({ id }: FooterSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<ParallaxLayout id={id} as="footer" disableParallax>
			<div className={rootClassName}>
				<div className="container">
					<div className={`${ns}__content`}>
						{/* <h1 className={`${ns}__title`}>FOOTER SECTION</h1> */}
					</div>
				</div>
			</div>
		</ParallaxLayout>
	);
}
