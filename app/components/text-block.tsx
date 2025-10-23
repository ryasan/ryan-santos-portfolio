import clsx from 'clsx'
import styles from '~/styles/components/text-block.module.scss'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type TextBlockProps = {
	align?: 'left' | 'center' | 'right'
	block: {
		id: string
		text: string
		type?: 'heading' | 'paragraph' | 'subheading'
	}
	index: number
}

export default function TextBlock({ block, index, align }: TextBlockProps) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-200px' })

	return (
		<motion.div
			className={clsx(styles.textBlock, align && styles[align])}
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
			transition={{
				duration: 0.6,
				delay: index * 0.15,
				ease: 'easeOut',
			}}
		>
			{block.type === 'heading' && <h2>{block.text}</h2>}
			{block.type === 'subheading' && <h3>{block.text}</h3>}
			{block.type === 'paragraph' && <p>{block.text}</p>}
			{!block.type && <p>{block.text}</p>}
		</motion.div>
	)
}
