import clsx from 'clsx';
import ParallaxLayout from '~/components/parallax-layout';

const ns = 'hero-section';

type HeroSectionProps = {
	id: number | null;
};

export default function HeroSection({ id }: HeroSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<ParallaxLayout className={rootClassName} id={id}>
			<div className="container">
				<div className={`${ns}__content`}>
					<h1 className={`${ns}__title`}>
						<span className={`${ns}__title--row`}>
							<span>Hello</span> World 👋
						</span>
						<span className={`${ns}__title--row`}>
							<span>My Name Is Ryan</span>
						</span>
						<span className={`${ns}__title--row`}>
							<span>Frontend Engineer</span>
						</span>
					</h1>
				</div>
			</div>
		</ParallaxLayout>
	);
}
