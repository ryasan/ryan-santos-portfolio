import clsx from 'clsx';
import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const ns = 'parallax-layout';

type ParallaxLayoutProps = {
	as?: 'section' | 'header' | 'footer';
	bgColor?: 'black' | 'white';
	children: React.ReactNode;
	className?: string;
	disableParallax?: boolean;
	id: number | null;
};

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ParallaxLayout({
	as: Element = 'section',
	bgColor = 'black',
	children,
	className,
	disableParallax,
	id,
}: ParallaxLayoutProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
		[`${ns}--bg-${bgColor}`]: bgColor,
	});

	const anchorRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: anchorRef });
	const y = useParallax(scrollYProgress, 300);

	return (
		<Element className={rootClassName} data-scroll-section>
			<div className={`${ns}__content`}>{children}</div>
			{!disableParallax && (
				<div className={`${ns}__parallax-anchor`} ref={anchorRef} />
			)}

			{typeof id === 'number' && !disableParallax && (
				<motion.div className={`${ns}__parallax-item`} style={{ y }}>
					<div className="container">
						<h2>{`#00${id}`}</h2>
					</div>
				</motion.div>
			)}
		</Element>
	);
}
