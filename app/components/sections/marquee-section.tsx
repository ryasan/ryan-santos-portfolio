import styles from '~/styles/components/sections/marquee-section.module.scss'
import {
	Marquee as MarqueeType,
	MarqueeSection as MarqueeSectionType,
} from '~/graphql/__generated/sdk'

const mockMarqueeCollection: Partial<MarqueeType & { sys: any }>[] = [
	{
		sys: {
			id: '1',
		},
		marqueeItems: Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`),
	},
	{
		sys: {
			id: '2',
		},
		marqueeItems: Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`),
	},
	{
		sys: {
			id: '3',
		},
		marqueeItems: Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`),
	},
]

type MarqueeSectionProps = {
	id?: string
	data: MarqueeSectionType
}

export default function MarqueeSection({ data, id }: MarqueeSectionProps) {
	const renderTrack = (
		items: (string | null | undefined)[] | null | undefined,
		isDuplicate = false,
	) => (
		<div className={styles.track} aria-hidden={isDuplicate}>
			<div className={styles.item}>
				{items?.filter((item): item is string => !!item).join(' • ')}
			</div>
		</div>
	)

	return (
		<section className={styles.marqueeSection} id={id}>
			{data?.title && <h2 className="h1">{data.title}</h2>}
			{mockMarqueeCollection.map((collection, index) => (
				<div className={styles.marquee} key={collection.sys?.id || index}>
					{renderTrack(collection.marqueeItems)}
					{renderTrack(collection.marqueeItems, true)}
				</div>
			))}
		</section>
	)
}
