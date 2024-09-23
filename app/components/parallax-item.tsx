import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import throttle from 'lodash/throttle';
import { useLocomotiveScroll } from '~/context/locomotive-scroll-context';

const ns = 'parallax-item';

type ParallaxItemProps = {
	anchor: 'left' | 'right' | 'center';
	children: React.ReactNode;
	className?: string;
	initialY?: number;
	speed?: 'slow' | 'medium' | 'fast';
	xOffset?: number;
};

export default function ParallaxItem({
	anchor,
	children,
	className,
	initialY = 300,
	speed = 'medium',
}: ParallaxItemProps) {
	const rootClassName = clsx({
		[`${ns}`]: true,
		[`${className}`]: className,
		[`${ns}--anchor-${anchor}`]: anchor,
	});

	const [motionY, setMotionY] = useState(initialY);
	const { scroll } = useLocomotiveScroll();
	const anchorRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const anchorInView = useInView(anchorRef);
	const contentRefHeight = contentRef.current?.clientHeight || 0;

	const handleScroll = useCallback(
		throttle(() => {
			console.log('scrolling');
			const anchorTop = anchorRef.current?.getBoundingClientRect().top || 0;
			const anchorInView = anchorTop < window.innerHeight && anchorTop > 0;

			if (anchorInView) {
				const scrollDistance = window.innerHeight - anchorTop;
				const speedMultiplier =
					speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1;
				setMotionY(
					initialY - (scrollDistance / initialY) * initialY * speedMultiplier,
				);
			}
		}, 25),
		[anchorInView, initialY, speed],
	);

	useEffect(() => {
		scroll?.on('scroll', handleScroll);

		return () => {
			scroll?.update();
		};
	}, [handleScroll, scroll]);

	return (
		<div className={rootClassName}>
			<div className={`${ns}__anchor`} ref={anchorRef} />
			<motion.div
				className={`${ns}__content`}
				ref={contentRef}
				style={{
					top: `calc(50% - ${contentRefHeight / 2}px)`,
					y: motionY,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
