import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	RefObject,
} from 'react';

import {
	useMotionValue,
	useSpring,
	frame,
	type MotionValue,
	type Spring,
} from 'framer-motion';

const spring: Partial<Spring> = {
	damping: 15,
	stiffness: 100,
	restDelta: 0.001,
};

type PointerFollowerContextType = {
	xPointer: MotionValue<number>;
	yPointer: MotionValue<number>;
	xFollwer: MotionValue<number>;
	yFollower: MotionValue<number>;
};

const PointerFollowerContext = createContext<
	PointerFollowerContextType | undefined
>(undefined);

export function usePointerFollower() {
	const context = useContext(PointerFollowerContext);
	if (context === undefined) {
		throw new Error(
			'usePointerFollower must be used within a PointerFollowerProvider',
		);
	}
	return context;
}

export default function PointerFollowerProvider({
	children,
	pointerRef,
}: {
	children: ReactNode;
	pointerRef: RefObject<HTMLElement>;
}) {
	const xPointer = useMotionValue(0);
	const yPointer = useMotionValue(0);
	const xFollwer = useSpring(xPointer, spring);
	const yFollower = useSpring(yPointer, spring);

	useEffect(() => {
		if (!pointerRef.current) return;
		if (window?.innerWidth < 992) return;

		const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
			const element = pointerRef.current!;

			frame.read(() => {
				xPointer.set(pageX - element.offsetLeft - element.offsetWidth / 2);
				yPointer.set(pageY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener('pointermove', handlePointerMove);

		return () => window.removeEventListener('pointermove', handlePointerMove);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PointerFollowerContext.Provider
			value={{ xPointer, yPointer, xFollwer, yFollower }}
		>
			{children}
		</PointerFollowerContext.Provider>
	);
}
