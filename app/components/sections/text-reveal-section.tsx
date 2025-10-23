import styles from '~/styles/components/sections/text-reveal-section.module.scss'
import TextBlock from '~/components/text-block'

type TextRevealSectionProps = {
	data?: any
}

export default function TextRevealSection({ data }: TextRevealSectionProps) {
	const textBlocks = [
		{
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
			type: 'heading',
		},
		{
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
			type: 'heading',
		},
		{
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
			type: 'heading',
		},
		]
	
	return (
		<section className={styles.textRevealSection}>
			<div className="container">
				<div className={styles.textBlocks}>
					{textBlocks.map((block: any, index: number) => (
						<TextBlock key={index} block={block} align='center' index={index} />
					))}
				</div>
			</div>
		</section>
	)
}
