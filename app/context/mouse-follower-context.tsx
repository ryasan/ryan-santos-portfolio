import {
	useContext,
	useEffect,
	useState,
	createContext,
	type ReactNode,
} from 'react';
import MouseFollower from 'mouse-follower';

type MouseFollowerContextType = {
	cursor: MouseFollower;
};

// Module-level variable to store the singleton instance of MouseFollower.
let mouseFollowerInstance: MouseFollower | null = null;

const MouseFollowerContext = createContext<
	MouseFollowerContextType | undefined
>(undefined);

export function useMouseFollower() {
	const context = useContext(MouseFollowerContext);
	if (!context) {
		throw new Error(
			'useMouseFollower must be used within a MouseFollowerProvider',
		);
	}
	return context;
}

export default function MouseFollowerProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [cursor, setCursor] = useState<MouseFollower>();

	useEffect(() => {
		async function getCursor() {
			// Lazy load GSAP to avoid SSR issues.
			const gsap = (await import('gsap')).default;

			MouseFollower.registerGSAP(gsap);

			// Check if the instance already exists.
			if (!mouseFollowerInstance) {
				mouseFollowerInstance = new MouseFollower();
			}

			setCursor(mouseFollowerInstance);
		}

		getCursor();
	}, []);

	useEffect(() => {
		return () => {
			cursor?.destroy();
		};
	}, [cursor]);

	return (
		<MouseFollowerContext.Provider value={{ cursor: cursor! }}>
			{children}
		</MouseFollowerContext.Provider>
	);
}
