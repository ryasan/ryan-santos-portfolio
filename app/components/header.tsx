import clsx from 'clsx';
import { motion } from 'framer-motion';
import { usePointerFollower } from '~/context';
import SectionLayout from '~/components/section-layout';

const ns = 'site-header';

export default function Header() {
	const rootClassName = clsx({
		[`${ns}`]: true,
	});

	const { setMixBlendMode } = usePointerFollower();

	const myName = 'LoremIpsum.'.split('');

	return (
		<SectionLayout
			className={rootClassName}
			as="header"
			onMouseEnter={() => setMixBlendMode(true)}
		>
			<div className="container-fluid">
				<span className={`${ns}__title`}>
					<small>
						{myName.map((letter, index, arr) => (
							<motion.span
								className={clsx({
									[`${ns}__letter`]: true,
									[`highlight`]: index > arr.indexOf('m'),
								})}
								key={index}
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{
									duration: 0.75,
									delay: 0.75 + index * 0.05,
									ease: 'linear',
								}}
							>
								{letter}
							</motion.span>
						))}
					</small>
				</span>
				<nav className={`${ns}__nav`}>
					<span className={`${ns}__menu-text`}>
						<small>menu</small>
					</span>
				</nav>
			</div>
		</SectionLayout>
	);
}
