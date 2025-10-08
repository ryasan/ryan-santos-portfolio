import styles from '~/styles/components/sections/article-grid-section.module.scss'
import { ArticleGridSection as ArticleGridSectionType } from '~/graphql/__generated/sdk'

type ArticleGridSectionProps = {
	data?: ArticleGridSectionType
}

export default function ArticleGridSection({ data }: ArticleGridSectionProps) {
	return <section className={styles.articleGridSection}>{data?.title}</section>
}
