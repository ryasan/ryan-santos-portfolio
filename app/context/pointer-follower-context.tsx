import {
	useMotionValue,
	useSpring,
	frame,
	type MotionValue,
	type Spring,
} from 'framer-motion'
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
	type ReactNode,
} from 'react'

/**
 * State types.
 */

type PointerFollowerState = {
	xFollower?: MotionValue<number>
	xPointer?: MotionValue<number>
	yFollower?: MotionValue<number>
	yPointer?: MotionValue<number>
	innerText: string
	followerElement?: HTMLElement
	isOutOfBounds: boolean
	followerSize: number
	stuckToElement?: HTMLElement | null
	isMixBlendMode: boolean
}

/**
 * Action types.
 */

type PointerFollowerActions = {
	resetFollowerSize(): void
	setFollower(element: HTMLElement): void
	setFollowerSize(size?: number): void
	setFollowerText(text: string): void
	setMixBlendMode(bool?: boolean): void
	setStick(element: HTMLElement): void
	removeStick(): void
}

/**
 * Create a context.
 */

const PointerFollowerContext = createContext<
	(PointerFollowerState & PointerFollowerActions) | undefined
>(undefined)

/**
 * Custom hook.
 */

export function usePointerFollower() {
	const context = useContext(PointerFollowerContext)
	if (context === undefined) {
		throw new Error(
			'usePointerFollower must be used within a PointerFollowerProvider',
		)
	}
	return context
}

/**
 * The initial state.
 */

const initialState: PointerFollowerState = {
	innerText: '',
	followerSize: 10,
	isOutOfBounds: false,
	isMixBlendMode: false,
	stuckToElement: null,
}

/**
 * Action types for the pointer follower.
 */

type PointerFollowerAction =
	| { type: 'SET_HTML_ELEMENT'; payload: HTMLElement }
	| { type: 'SET_SIZE'; payload: number }
	| { type: 'SET_TEXT'; payload: string }
	| { type: 'SET_OUT_OF_BOUNDS'; payload: boolean }
	| { type: 'SET_STUCK_TO_ELEMENT'; payload: HTMLElement | null }
	| { type: 'SET_MIX_BLEND_MODE'; payload: boolean }

/**
 * State reducer.
 */

function pointerFollowerReducer(
	state: PointerFollowerState,
	action: PointerFollowerAction,
): PointerFollowerState {
	switch (action.type) {
		case 'SET_HTML_ELEMENT':
			return {
				...state,
				followerElement: action.payload,
			}
		case 'SET_SIZE':
			return {
				...state,
				followerSize: action.payload,
			}
		case 'SET_TEXT':
			return {
				...state,
				innerText: action.payload,
				followerSize: action.payload ? 100 : 10,
			}
		case 'SET_OUT_OF_BOUNDS':
			return {
				...state,
				isOutOfBounds: action.payload,
			}
		case 'SET_STUCK_TO_ELEMENT':
			return {
				...state,
				stuckToElement: action.payload,
			}
		case 'SET_MIX_BLEND_MODE':
			return {
				...state,
				isMixBlendMode: action.payload,
			}
		default:
			return state
	}
}

/**
 * The pointer follower provider component for managing state.
 */

export default function PointerFollowerProvider({
	children,
}: {
	children: ReactNode
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
	}

	/**
	 * Framer motion values.
	 *
	 * @type {MotionValue<number>}
	 */
	const xPointer = useMotionValue(0)
	const yPointer = useMotionValue(0)

	/**
	 * Spring values.
	 *
	 * @type {MotionValue<number>}
	 */
	const xFollower = useSpring(xPointer, spring)
	const yFollower = useSpring(yPointer, spring)

	/**
	 * Follower element.
	 *
	 * @type {HTMLElement}
	 */
	const [followerElement, setFollowerElement] = useState<HTMLElement>()

	/**
	 * Reducer.
	 *
	 * @type {PointerFollowerState}
	 */
	const [state, dispatch] = useReducer(pointerFollowerReducer, initialState)

	/**
	 * Initialize the follower element.
	 *
	 * @param {HTMLElement} element
	 */
	function setFollower(element: HTMLElement) {
		setFollowerElement(element)
	}

	/**
	 * Set the size of the follower element.
	 *
	 * @param {number} size
	 */
	function setFollowerSize(size?: number) {
		if (typeof size === 'number') {
			dispatch({ type: 'SET_SIZE', payload: size })
		}
	}

	/**
	 * Reset the follower size.
	 *
	 * @returns {void}
	 */
	function resetFollowerSize() {
		dispatch({ type: 'SET_SIZE', payload: 10 })
	}

	/**
	 * Set the text of the follower element.
	 *
	 * @param {string} text
	 */
	function setFollowerText(text: string) {
		dispatch({ type: 'SET_TEXT', payload: text })
	}

	/**
	 * Set the mix blend mode.
	 *
	 * @param {boolean} bool
	 */
	function setMixBlendMode(bool?: boolean) {
		dispatch({
			type: 'SET_MIX_BLEND_MODE',
			payload: bool ?? !state.isMixBlendMode,
		})
	}

	/**
	 * Stick the follower to the element
	 *
	 * @param {HTMLElement} element
	 */
	function setStick(element: HTMLElement) {
		dispatch({
			type: 'SET_STUCK_TO_ELEMENT',
			payload: element,
		})
	}

	/**
	 * Remove the stickiness
	 *
	 * @param {HTMLElement} element
	 */
	function removeStick() {
		dispatch({
			type: 'SET_STUCK_TO_ELEMENT',
			payload: null,
		})
	}

	/**
	 * Get the position of an element.
	 *
	 * @param {HTMLElement}
	 * @returns {Object}
	 */
	function getElementPosition(element: HTMLElement) {
		const rect = element.getBoundingClientRect()
		return {
			x: rect.left + window.scrollX + rect.width / 2,
			y: rect.top + window.scrollY + rect.height / 2,
		}
	}

	/**
	 * Update the follower position.
	 *
	 * @param {MouseEvent} event
	 */
	function updateFollowerPosition(event: MouseEvent) {
		const { pageX, pageY } = event
		const el = followerElement!

		frame.read(() => {
			const x = pageX - el.offsetLeft - el.offsetWidth / 2
			const y = pageY - el.offsetTop - el.offsetHeight / 2
			xPointer.set(x)
			yPointer.set(y)
		})
	}

	/**
	 * Check if the follower is stuck to an element.
	 *
	 * @param {MouseEvent} event
	 * @returns {boolean}
	 */
	function checkStuckToElement() {
		const followerEl = followerElement
		const stuckEl = state.stuckToElement
		const size = state.followerSize

		if (!stuckEl || !followerEl) return false

		const { x, y } = getElementPosition(stuckEl)
		xPointer.set(x - Math.floor(size / 2))
		yPointer.set(y - Math.floor(size / 2))

		return true
	}

	/**
	 * Check if the pointer is out of bounds.
	 *
	 * @param {MouseEvent} event
	 * @returns {boolean}
	 */
	function checkOutOfBounds(event: MouseEvent) {
		const { clientX, clientY } = event

		if (
			clientX < 5 ||
			clientY < 5 ||
			clientX > window.innerWidth - 5 ||
			clientY > window.innerHeight - 5
		) {
			dispatch({ type: 'SET_OUT_OF_BOUNDS', payload: true })
			return true
		} else {
			dispatch({ type: 'SET_OUT_OF_BOUNDS', payload: false })
			return false
		}
	}

	/**
	 * Handle pointer move.
	 *
	 * @param {MouseEvent} event
	 */
	useEffect(() => {
		if (!followerElement) return
		if (window?.innerWidth < 992) return

		async function handlePointerMove(event: MouseEvent) {
			const isStuckToElement = checkStuckToElement()
			const isOutOfBounds = checkOutOfBounds(event)
			if (isStuckToElement) return
			if (isOutOfBounds) return
			updateFollowerPosition(event)
		}

		window.addEventListener('pointermove', handlePointerMove)

		return () => {
			window.removeEventListener('pointermove', handlePointerMove)
		}
	}, [followerElement, state.stuckToElement]) // eslint-disable-line

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
				setFollowerSize,
				resetFollowerSize,
				setFollowerText,
				setMixBlendMode,
				setStick,
				removeStick,
			}}
		>
			{children}
		</PointerFollowerContext.Provider>
	)
}
