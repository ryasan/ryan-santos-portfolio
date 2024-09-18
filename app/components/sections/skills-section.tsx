import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import ParallaxLayout from '~/components/parallax-layout';
import TagCloud from '~/components/tag-cloud';

const ns = 'skills-section';

type SkillsSectionProps = {
	id: number | null;
};

export default function SkillsSection({ id }: SkillsSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const anchorRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: anchorRef });
	const maxWidth = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

	return (
		<ParallaxLayout id={id} fullHeight={false}>
			<div className={rootClassName}>
				<div className="container">
					<div className={`${ns}__anchor`} ref={anchorRef} />

					<motion.div
						className={`${ns}__content`}
						style={{ maxWidth }}
					>
						<TagCloud />
					</motion.div>
				</div>
			</div>
		</ParallaxLayout>
	);
}
