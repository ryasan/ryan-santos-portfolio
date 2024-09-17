import { motion } from 'framer-motion';
import clsx from 'clsx';
import Button from '~/components/button';
import ParallaxLayout from '~/components/parallax-layout';

const ns = 'hero-section';

type HeroSectionProps = {
	id: number | null;
};

export default function HeroSection({ id }: HeroSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const firstRowChars = 'My Name Is Ryan.'.split('');
	const secondRowChars = 'Frontend Engineer'.split('');

	return (
		<ParallaxLayout className={rootClassName} id={id}>
			<div className="container">
				<div className={`${ns}__content`}>
					<h1 className={`${ns}__title`}>
						<span className="first-row">
							{firstRowChars.map((char, index) => (
								<motion.span
									key={index}
									initial={{ y: 100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.25,
										delay: 0.2 + index * 0.03,
										ease: 'easeOut',
									}}
								>
									{char === ' ' ? '\u00A0' : char}
								</motion.span>
							))}
						</span>
						<span className="second-row">
							{secondRowChars.map((char, index) => (
								<motion.span
									key={index}
									initial={{ y: 100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{
										duration: 0.25,
										delay: 0.2 + (firstRowChars.length + index) * 0.03,
										ease: 'easeOut',
									}}
								>
									{char === ' ' ? '\u00A0' : char}
								</motion.span>
							))}
						</span>
					</h1>
					<div className={`${ns}__cta`}>
						<Button as="a" mailto="ryansantos86@gmail.com">
							Let&apos;s Connect
						</Button>
					</div>
				</div>
			</div>
		</ParallaxLayout>
	);
}
