import RichText from '~/components/rich-text'
import styles from '~/styles/components/sections/blog-rich-text-section.module.scss'
import { Document } from '@contentful/rich-text-types'

type BlogRichTextSectionProps = {
	data?: {
		content: {
			json: Document
		}
	}
}

export default function BlogRichTextSection({
	data,
}: BlogRichTextSectionProps) {
	return (
		<section className={styles.blogRichTextSection}>
			<div className="container">
				{data?.content.json && <RichText data={data?.content.json} />}
			</div>
		</section>
	)
}
