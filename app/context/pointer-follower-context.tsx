import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useReducer,
	useState,
} from 'react';
import {
	useMotionValue,
	useSpring,
	frame,
	type MotionValue,
	type Spring,
} from 'framer-motion';

/**
 * State types.
 */

type PointerFollowerState = {
	xFollower?: MotionValue<number>;
	xPointer?: MotionValue<number>;
	yFollower?: MotionValue<number>;
	yPointer?: MotionValue<number>;
	innerText: string;
	followerElement?: HTMLElement;
	followerIsOutOfBounds: boolean;
	followerSize: 10 | 100;
	isStuckToElement?: boolean;
	mixBlendModeEnabled: boolean;
};

/**
 * Action types.
 */

type PointerFollowerActions = {
	setFollower(element: HTMLElement): void;
	setFollowerText(text: string): void;
	setMixBlendMode(bool?: boolean): void;
	setStick(element: HTMLElement): void;
	removeStick(element: HTMLElement): void;
};

/**
 * Create a context.
 */

const PointerFollowerContext = createContext<
	(PointerFollowerState & PointerFollowerActions) | undefined
>(undefined);

/**
 * Custom hook.
 */

export function usePointerFollower() {
	const context = useContext(PointerFollowerContext);
	if (context === undefined) {
		throw new Error(
			'usePointerFollower must be used within a PointerFollowerProvider',
		);
	}
	return context;
}

/**
 * The initial state.
 */

const initialState: PointerFollowerState = {
	innerText: '',
	followerSize: 10,
	followerIsOutOfBounds: false,
	isStuckToElement: false,
	mixBlendModeEnabled: false,
};

/**
 * Action types for the pointer follower.
 */

type PointerFollowerAction =
	| { type: 'SET_FOLLOWER_ELEMENT'; payload: HTMLElement }
	| { type: 'SET_TEXT'; payload: string }
	| { type: 'SET_OUT_OF_BOUNDS'; payload: boolean }
	| { type: 'SET_IS_STUCK_TO_ELEMENT'; payload: boolean }
	| { type: 'SET_MIX_BLEND_MODE'; payload: boolean };

/**
 * State reducer.
 */

function pointerFollowerReducer(
	state: PointerFollowerState,
	action: PointerFollowerAction,
): PointerFollowerState {
	switch (action.type) {
		case 'SET_FOLLOWER_ELEMENT':
			return {
				...state,
				followerElement: action.payload,
			};
		case 'SET_TEXT':
			return {
				...state,
				innerText: action.payload,
				followerSize: action.payload ? 100 : 10,
			};
		case 'SET_OUT_OF_BOUNDS':
			return {
				...state,
				followerIsOutOfBounds: action.payload,
			};
		case 'SET_IS_STUCK_TO_ELEMENT':
			return {
				...state,
				isStuckToElement: action.payload,
				followerSize: action.payload ? 100 : 10,
			};
		case 'SET_MIX_BLEND_MODE':
			return {
				...state,
				mixBlendModeEnabled: action.payload,
			};
		default:
			return state;
	}
}

/**
 * The pointer follower provider component for managing state.
 */

export default function PointerFollowerProvider({
	children,
}: {
	children: ReactNode;
}) {
	/**
	 * Spring settings.
	 *
	 * @type {Partial<Spring>}
	 */
	const spring: Partial<Spring> = {
		damping: 30,
		stiffness: 300,
		restDelta: 0.001,
	};

	/**
	 * Framer motion values.
	 *
	 * @type {MotionValue<number>}
	 */
	const xPointer = useMotionValue(0);
	const yPointer = useMotionValue(0);

	/**
	 * Spring values.
	 *
	 * @type {MotionValue<number>}
	 */
	const xFollower = useSpring(xPointer, spring);
	const yFollower = useSpring(yPointer, spring);

	/**
	 * Follower element.
	 */
	const [followerElement, setFollowerElement] = useState<HTMLElement>();
	const [state, dispatch] = useReducer(pointerFollowerReducer, initialState);

	/**
	 * Initialize the follower element.
	 *
	 * @param {HTMLElement} element
	 */
	function setFollower(element: HTMLElement) {
		setFollowerElement(element);
	}

	/**
	 * Set the text of the follower element.
	 *
	 * @param {string} text
	 */
	function setFollowerText(text: string) {
		dispatch({ type: 'SET_TEXT', payload: text });
	}

	/**
	 * Set the mix blend mode.
	 *
	 * @param {boolean} bool
	 */
	function setMixBlendMode(bool?: boolean) {
		dispatch({
			type: 'SET_MIX_BLEND_MODE',
			payload: bool ?? !state.mixBlendModeEnabled,
		});
	}

	/**
	 * Stick the follower to the element
	 *
	 * @param {HTMLElement} element
	 */
	function setStick(element: HTMLElement) {
		console.log('setStick');
		const rect = element.getBoundingClientRect();
		// const x = rect.top + rect.width / 2;
		const x = rect.top;
		// const y = rect.left + rect.height / 2;
		const y = rect.left;

		dispatch({
			type: 'SET_IS_STUCK_TO_ELEMENT',
			payload: true,
		});

		// frame.read(() => {
		console.log({x, y});
			xPointer.set(x);
			yPointer.set(y);
		// });
	}

	/**
	 * Remove the stickiness
	 *
	 * @param {HTMLElement} element
	 */
	function removeStick(element: HTMLElement) {
		// dispatch({
		// 	type: 'SET_IS_STUCK_TO_ELEMENT',
		// 	payload: false,
		// });
	}

	/**
	 * Handle pointer move.
	 *
	 * @param {MouseEvent} event
	 */
	useEffect(() => {
		if (!followerElement || window?.innerWidth < 992) {
			return;
		}

		async function handlePointerMove(event: MouseEvent) {
			if (state.isStuckToElement) return;

			const { pageX, pageY, clientX, clientY } = event;
			const el = followerElement!;

			frame.read(() => {
				console.log('frame.read');
				xPointer.set(pageX - el.offsetLeft - el.offsetWidth / 2);
				yPointer.set(pageY - el.offsetTop - el.offsetHeight / 2);
			});

			if (
				clientX < 5 ||
				clientY < 5 ||
				clientX > window.innerWidth - 5 ||
				clientY > window.innerHeight - 5
			) {
				dispatch({ type: 'SET_OUT_OF_BOUNDS', payload: true });
			} else {
				dispatch({ type: 'SET_OUT_OF_BOUNDS', payload: false });
			}
		}

		window.addEventListener('pointermove', handlePointerMove);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	}, [followerElement, state.isStuckToElement]); // eslint-disable-line

	/**
	 * Append the follower element as the last child of the main element.
	 *
	 * @param {HTMLElement} followerElement
	 */
	useEffect(() => {
		if (followerElement) {
			const main = document.querySelector('main');
			const lastChild = main?.lastElementChild;

			if (lastChild !== followerElement) {
				main?.appendChild(followerElement!);
			}
		}
	}, [followerElement]);

	/**
	 * Render the provider.
	 *
	 * @returns {ReactNode}
	 */
	return (
		<PointerFollowerContext.Provider
			value={{
				...state,
				xPointer,
				yPointer,
				xFollower,
				yFollower,
				setFollower,
				setFollowerText,
				setMixBlendMode,
				setStick,
				removeStick,
			}}
		>
			{children}
		</PointerFollowerContext.Provider>
	);
}
