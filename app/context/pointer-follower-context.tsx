import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import {
	useMotionValue,
	useSpring,
	frame,
	type MotionValue,
	type Spring,
} from 'framer-motion';

const spring: Partial<Spring> = {
	damping: 30,
	stiffness: 300,
	restDelta: 0.001,
};

type PointerFollowerContextType = {
	followerSize: 'sm' | 'lg';
	innerText: string;
	xPointer: MotionValue<number>;
	yPointer: MotionValue<number>;
	xFollower: MotionValue<number>;
	yFollower: MotionValue<number>;
	initFollower(element: HTMLElement): void;
	setFollowerText(text: string): void;
	toggleMixBlendMode(state?: boolean): void;
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
}: {
	children: ReactNode;
}) {
	const xPointer = useMotionValue(0);
	const yPointer = useMotionValue(0);
	const xFollower = useSpring(xPointer, spring);
	const yFollower = useSpring(yPointer, spring);
	const [innerText, setInnerText] = useState('');
	const [followerSize, setSize] = useState<'sm' | 'lg'>('sm');
	const [mixBlendModeEnabled, setMixBlendModeEnabled] = useState(false);
	const [pointerEl, setPointerEl] = useState<HTMLElement>();

	function initFollower(element: HTMLElement) {
		setPointerEl(element);
	}

	function setFollowerText(text: string) {
		setInnerText(text);
	}

	function toggleMixBlendMode(state?: boolean) {
		if (state === true || state === false) {
			setMixBlendModeEnabled(state);
		} else {
			setMixBlendModeEnabled(!mixBlendModeEnabled);
		}
	}

	useEffect(() => {
		if (!pointerEl) return;
		if (window?.innerWidth < 992) return;

		const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
			const element = pointerEl!;

			frame.read(() => {
				xPointer.set(pageX - element.offsetLeft - element.offsetWidth / 2);
				yPointer.set(pageY - element.offsetTop - element.offsetHeight / 2);
			});
		};

		window.addEventListener('pointermove', handlePointerMove);

		return () => window.removeEventListener('pointermove', handlePointerMove);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pointerEl]);

	useEffect(() => {
		if (!pointerEl) return;

		if (mixBlendModeEnabled) {
			pointerEl.classList.add('mix-blend-mode');
		} else {
			pointerEl.classList.remove('mix-blend-mode');
		}
	}, [mixBlendModeEnabled, pointerEl]);

	useEffect(() => {
		setSize(innerText ? 'lg' : 'sm');
	}, [innerText]);

	return (
		<PointerFollowerContext.Provider
			value={{
				followerSize,
				innerText,
				xPointer,
				yPointer,
				xFollower,
				yFollower,
				initFollower,
				setFollowerText,
				toggleMixBlendMode,
			}}
		>
			{children}
		</PointerFollowerContext.Provider>
	);
}
