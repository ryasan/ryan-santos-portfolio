import { clsx } from 'clsx'
import { MarqueeSection as MarqueeSectionType } from '~/graphql/__generated/sdk'
import styles from '~/styles/components/sections/marquee-section.module.scss'

const renderTrack = (
	items: (string | null | undefined)[] | null | undefined,
	isDuplicate = false,
) => (
	<div className={styles.track} aria-hidden={isDuplicate ? 'true' : undefined}>
		<div className={styles.item}>
			{items?.filter((item): item is string => !!item).join(' • ')}
		</div>
	</div>
)

type MarqueeSectionProps = {
	id?: string
	data: MarqueeSectionType
}

export default function MarqueeSection({ data, id }: MarqueeSectionProps) {
	return (
		<section className={styles.marqueeSection} id={id}>
			{data?.title && (
				<h2 className={clsx(styles.title, 'h2')}>{data.title}</h2>
			)}
			{data?.marqueeRowsCollection?.items?.map((collection, index) => (
				<div
					className={clsx(styles.marquee, index % 2 !== 0 && styles.reverse)}
					key={collection?.sys?.id || index}
				>
					{renderTrack(collection?.marqueeItems)}
					{renderTrack(collection?.marqueeItems, true)}
				</div>
			))}
		</section>
	)
}
