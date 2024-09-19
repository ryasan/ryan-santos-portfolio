import clsx from 'clsx';

const ns = 'footer-section';

export default function FooterSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<div className={rootClassName} data-scroll-section>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h2 className={`${ns}__title`}>FOOTER SECTION</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
