import clsx from 'clsx';
import type { MetaFunction } from '@netlify/remix-runtime';

import FooterSection from '~/components/sections/footer-section';
import HeroSection from '~/components/sections/hero-section';
import ScrollProgressBar from '~/components/scroll-progress-bar';
import WorksSection from '~/components/sections/works-section';

const ns = 'home';

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
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	return (
		<div className={rootClassName}>
			<HeroSection id={1} />
			<WorksSection id={2} />
			<WorksSection id={3} />
			<WorksSection id={4} />
			<FooterSection id={5} />
			<ScrollProgressBar />
		</div>
	);
}
