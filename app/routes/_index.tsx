import { type MetaFunction } from '@netlify/remix-runtime'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'

import { client } from '~/models/contentful.server'

export async function loader() {
	const blogs = (await client.getAllBlogs()).slice(0, 6)
	const projects = (await client.getProjects()).slice(0, 6)
	return json({ blogs, projects })
}

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Home - Ryan Santos Portfolio',
		},
		{
			name: 'description',
			content: 'A portfolio site showcasing the works of Ryan Santos',
		},
	]
}

export default function Index() {
	const { projects } = useLoaderData<typeof loader>()

	return (
		<>
			{/* <HeroSection />
			<ProjectsSection projects={projects} /> */}
		</>
	)
}
