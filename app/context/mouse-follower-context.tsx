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
			const gsap = (await import('gsap')).default;
			MouseFollower.registerGSAP(gsap);
		}

		getCursor().then(() => {
			const cursor = new MouseFollower();
			setCursor(cursor);
		});
	}, []);

	return (
		<MouseFollowerContext.Provider value={{ cursor: cursor! }}>
			{children}
		</MouseFollowerContext.Provider>
	);
}
