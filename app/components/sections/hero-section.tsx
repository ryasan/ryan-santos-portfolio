import { useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Button from '~/components/button';
import ParallaxLayout from '~/components/parallax-layout';
import { usePointerFollower } from '~/context/pointer-follower-context';

const ns = 'hero-section';

type HeroSectionProps = {
	id: number | null;
};

export default function HeroSection({ id }: HeroSectionProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const rootRef = useRef(null);
	const { toggleMixBlendMode, setFollowerText } = usePointerFollower();

	const DELAY = 0.75;
	const firstRowChars = 'My Name Is Ryan.'.split('');
	const secondRowChars = 'Frontend Engineer'.split('');

	return (
		<ParallaxLayout id={id}>
			<div
				className={rootClassName}
				ref={rootRef}
				onMouseEnter={() => toggleMixBlendMode(true)}
				onMouseLeave={() => toggleMixBlendMode(false)}
			>
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
											delay: DELAY + index * 0.03,
											ease: 'easeOut',
										}}
										onMouseEnter={() => setFollowerText(' ')}
										onMouseLeave={() => setFollowerText('')}
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
											delay: DELAY + (firstRowChars.length + index) * 0.03,
											ease: 'easeOut',
										}}
										onMouseEnter={() => setFollowerText(' ')}
										onMouseLeave={() => setFollowerText('')}
									>
										{char === ' ' ? '\u00A0' : char}
									</motion.span>
								))}
							</span>
						</h1>
						<motion.div
							className={`${ns}__cta`}
							initial={{ y: 100, opacity: 0 }}
							animate={{ y: 70, opacity: 1 }}
							transition={{
								duration: 0.25,
								delay:
									DELAY * 2 +
									(firstRowChars.length + secondRowChars.length) * 0.03,
								ease: 'easeOut',
							}}
						>
							<Button
								as="a"
								mailto="ryansantos86@gmail.com"
								onMouseEnter={() => setFollowerText(' ')}
								onMouseLeave={() => setFollowerText('')}
							>
								Let&apos;s Connect
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</ParallaxLayout>
	);
}
