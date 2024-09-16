import { RefObject, useEffect } from 'react';
import { useMotionValue, useSpring, frame, type Spring } from 'framer-motion';

const spring: Partial<Spring> = {
	damping: 15,
	stiffness: 100,
	restDelta: 0.001,
};

export function useFollowPointer(ref: RefObject<HTMLElement>) {
	const xPoint = useMotionValue(0);
	const yPoint = useMotionValue(0);
	const x = useSpring(xPoint, spring);
	const y = useSpring(yPoint, spring);

	useEffect(() => {
		if (!ref.current) return;
		if (window?.innerWidth < 992) return;

		const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
			const element = ref.current!;

			frame.read(() => {
				xPoint.set(pageX - element.offsetLeft - element.offsetWidth / 2);
				yPoint.set(pageY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener('pointermove', handlePointerMove);

		return () => window.removeEventListener('pointermove', handlePointerMove);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { x, y };
}
