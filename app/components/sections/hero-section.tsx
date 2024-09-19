import { useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Button from '~/components/button';
import { usePointerFollower } from '~/context/pointer-follower-context';

const ns = 'hero-section';

export default function HeroSection() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const rootRef = useRef(null);
	const { toggleMixBlendMode, setFollowerText } = usePointerFollower();

	const DELAY = 0.75;

	const iCreateWebsites = 'I Create Websites'.split('');
	const myNameIsRyan = 'My Name Is Ryan.'.split('');
	const frontendEngineer = 'Frontend Engineer'.split('');

	return (
		<div
			className={rootClassName}
			ref={rootRef}
			onMouseEnter={() => toggleMixBlendMode(true)}
			onMouseLeave={() => toggleMixBlendMode(false)}
			data-scroll-section
		>
			<div className={`${ns}__inner`}>
				<div className="container">
					<div className={`${ns}__content`}>
						<h1 className={`${ns}__title`}>
							<span className="first-row">
								{myNameIsRyan.map((char, index) => (
									<motion.span
										key={index}
										initial={{ y: 100 }}
										animate={{ y: 0 }}
										transition={{
											duration: 0.5,
											delay: DELAY + index * 0.02,
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
								{frontendEngineer.map((char, index) => (
									<motion.span
										key={index}
										initial={{ y: 100 }}
										animate={{ y: 0 }}
										transition={{
											duration: 0.5,
											delay: DELAY + (myNameIsRyan.length + index) * 0.02,
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

						<div className={`${ns}__cta`}>
							<motion.div
								initial={{ y: '100%' }}
								animate={{ y: 0 }}
								transition={{
									duration: 0.5,
									delay:
										DELAY * 1.5 +
										(myNameIsRyan.length + frontendEngineer.length) * 0.03,
									ease: 'easeOut',
								}}
							>
								<Button
									as="a"
									mailto="ryansantos86@gmail.com"
									onMouseEnter={() => setFollowerText(' ')}
									onMouseLeave={() => setFollowerText('')}
									variant="black"
								>
									Let&apos;s Connect
								</Button>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
