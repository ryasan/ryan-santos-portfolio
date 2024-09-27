import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import TagCloud from '~/components/tag-cloud'

const ns = 'skills-section'

export default function SkillsSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	})

	const anchorRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({ target: anchorRef })
	const maxWidth = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])

	return (
		<section className={rootClassName} data-scroll-section>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__anchor`} ref={anchorRef} />

					<motion.div className={`${ns}__content`} style={{ maxWidth }}>
						<TagCloud />
					</motion.div>
				</div>
			</div>
		</section>
	)
}
