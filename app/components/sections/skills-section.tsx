import clsx from 'clsx';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

	const rootRef = useRef(null);
	const isInView = useInView(rootRef, { once: true, amount: 0.7 });

	return (
		<ParallaxLayout id={id}>
			<motion.div
				className={rootClassName}
				ref={rootRef}
				initial={{ width: 'auto', borderRadius: '50%' }}
				animate={{
					width: isInView ? '100%' : 'auto',
					borderRadius: isInView ? '72px 72px 0 0' : '50%',
				}}
				// transition={{ duration: 0.5 }}
			>
				<div className="container">
					<div className={`${ns}__content`}>
						{/* <h1 className={`${ns}__title`}>Skills</h1> */}

						<TagCloud />
					</div>
				</div>
			</motion.div>
		</ParallaxLayout>
	);
}
