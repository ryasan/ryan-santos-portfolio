import clsx from 'clsx';
import ParallaxLayout from '~/components/parallax-layout';

const ns = 'skills-section';

type SkillsSectionProps = {
	id: number | null;
};

export default function SkillsSection({ id }: SkillsSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<ParallaxLayout className={rootClassName} id={id}>
			<div className="container">
				<div className={`${ns}__content`}>
					<h1 className={`${ns}__title`}>SKILLS SECTION</h1>
				</div>
			</div>
		</ParallaxLayout>
	);
}
