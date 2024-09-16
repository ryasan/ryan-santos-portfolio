import { motion, useScroll, useSpring } from 'framer-motion';
import clsx from 'clsx';
import ClientOnly from '~/components/client-only';

const ns = 'scroll-progress-bar';

const ScrollProgressBar = () => {
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
		<ClientOnly>
			<motion.div className={rootClassName} style={{ scaleX }} />
		</ClientOnly>
	);
};

export default ScrollProgressBar;
