import { motion, useScroll, useSpring } from 'framer-motion';
import clsx from 'clsx';
import type { MetaFunction } from '@netlify/remix-runtime';
import type { LinksFunction } from '@remix-run/node';

import styles from '~/styles/main.css?url';
import FooterSection from '~/components/sections/footer-section';
import HeroSection from '~/components/sections/hero-section';
import WorksSection from '~/components/sections/works-section';

const ns = 'home';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Ryan Santos Portfolio' },
		{
			name: 'description',
			content: 'A portfolio site showcasing the works of Ryan Santos',
		},
	];
};

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
		},
		{ rel: 'stylesheet', href: styles },
	];
};

export default function Index() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<div className={rootClassName}>
			<HeroSection id={1} />
			<WorksSection id={2} />
			<WorksSection id={3} />
			<WorksSection id={4} />
			<FooterSection id={5} />
			<motion.div
				style={{
					background: 'white',
					bottom: 100,
					height: 5,
					left: 0,
					position: 'fixed',
					right: 0,
					scaleX,
				}}
			/>
		</div>
	);
}
