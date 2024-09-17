import { json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction } from '@netlify/remix-runtime';

import FooterSection from '~/components/sections/footer-section';
import HeroSection from '~/components/sections/hero-section';
import SkillsSection from '~/components/sections/skills-section';
import WorksSection from '~/components/sections/works-section';
import { client } from '~/models/contentful.server';
import type { Project } from '~/types';

export async function loader() {
	const projects = await client.getProjects();
	return json({ projects });
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Home - Ryan Santos Portfolio' },
		{
			name: 'description',
			content: 'A portfolio site showcasing the works of Ryan Santos',
		},
	];
};

export default function Index() {
	const { projects } = useLoaderData() as { projects: Project[] };

	return (
		<>
			<HeroSection id={1} />
			{/* <SkillsSection id={2} /> */}
			<WorksSection id={3} projects={projects} />
			<FooterSection id={4} />
		</>
	);
}
