import { type MetaFunction } from '@netlify/remix-runtime'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'

import AboutSection from '~/components/sections/about-section'
import BlogsSection from '~/components/sections/blogs-section'
import HeroSection from '~/components/sections/hero-section'
import ProjectsSection from '~/components/sections/projects-section'
import { client } from '~/models/contentful.server'

export async function loader() {
	const blogs = await client.getAllBlogs()
	const projects = await client.getProjects()
	return json({ blogs, projects })
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Home - Ryan Santos Portfolio' },
		{
			name: 'description',
			content: 'A portfolio site showcasing the works of Ryan Santos',
		},
	]
}

export default function Index() {
	const { blogs, projects } = useLoaderData<typeof loader>()

	return (
		<>
			<HeroSection />
			<AboutSection />
			<ProjectsSection projects={projects} />
		</>
	)
}
