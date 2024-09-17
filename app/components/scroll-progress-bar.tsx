import { motion, useScroll, useSpring } from 'framer-motion';
import clsx from 'clsx';

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

	return <motion.div className={rootClassName} style={{ scaleX }} />;
};

export default ScrollProgressBar;
