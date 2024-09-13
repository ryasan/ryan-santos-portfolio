import clsx from 'clsx';
import ParallaxLayout from '~/components/parallax-layout';

const ns = 'works-section';

type WorksSectionProps = {
	id: number | null;
};

export default function WorksSection({ id }: WorksSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<ParallaxLayout className={rootClassName} id={id}>
			<div className="container">
				<div className={`${ns}__content`}>
					<h1 className={`${ns}__title`}>SECTION</h1>
				</div>
			</div>
		</ParallaxLayout>
	);
}
