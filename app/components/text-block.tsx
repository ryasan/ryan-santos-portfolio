import clsx from 'clsx'
import { type TextRevealItem } from '~/graphql/__generated/sdk'

const ns = 'text-block'

type TextBlockProps = {
	align?: 'left' | 'center' | 'right'
	block: TextRevealItem
	className?: string
	index: number
}

export default function TextBlock({ align, block, className }: TextBlockProps) {
	return (
		<div className={clsx(ns, align, className)}>
			{block.type === 'heading' && <h2>{block.text}</h2>}
			{block.type === 'subheading' && <h3>{block.text}</h3>}
			{block.type === 'description' && <p>{block.text}</p>}
			{!block.type && <p>{block.text}</p>}
		</div>
	)
}
