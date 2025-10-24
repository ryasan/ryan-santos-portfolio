import clsx from 'clsx'
import styles from '~/styles/components/text-block.module.scss'

type TextBlockProps = {
	align?: 'left' | 'center' | 'right'
	block: any
	index: number
}

export default function TextBlock({ block, align }: TextBlockProps) {
	return (
		<div className={clsx(styles.textBlock, align && styles[align])}>
			{block.type === 'heading' && <h2>{block.text}</h2>}
			{block.type === 'subheading' && <h3>{block.text}</h3>}
			{block.type === 'paragraph' && <p>{block.text}</p>}
			{!block.type && <p>{block.text}</p>}
		</div>
	)
}
