import clsx from 'clsx'
import styles from '~/styles/components/text-block.module.scss'
import { type TextRevealItem } from '~/graphql/__generated/sdk'

type TextBlockProps = {
	align?: 'left' | 'center' | 'right'
	block: TextRevealItem
	className?: string
	index: number
}

export default function TextBlock({ align, block, className }: TextBlockProps) {
	return (
		<div className={clsx(styles.textBlock, align && styles[align], className)}>
			{block.type === 'heading' && <h2>{block.text}</h2>}
			{block.type === 'subheading' && <h3>{block.text}</h3>}
			{block.type === 'description' && <p>{block.text}</p>}
			{!block.type && <p>{block.text}</p>}
		</div>
	)
}
