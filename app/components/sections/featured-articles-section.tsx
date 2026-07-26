import FeaturedBlogsSection from './featured-blogs-section'
import FeaturedProjectsSection from './featured-projects-section'
import { type FeaturedArticlesSection as FeaturedArticlesSectionType } from '~/graphql/__generated/sdk'

type FeaturedArticlesSectionProps = {
	data?: FeaturedArticlesSectionType
	id?: string
}

export default function FeaturedArticlesSection({
	data,
	id,
}: FeaturedArticlesSectionProps) {
	switch (data?.type) {
		case 'Blog':
			return <FeaturedBlogsSection data={data} id={id} />
		case 'Project':
		default:
			return <FeaturedProjectsSection data={data} id={id} />
	}
}
