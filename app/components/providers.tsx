import LocomotiveScrollProvider from '~/context/locomotive-scroll-context';
import MouseFollowerProvider from '~/context/mouse-follower-context';
import PointerFollowerProvider from '~/context/pointer-follower-context';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LocomotiveScrollProvider>
			<PointerFollowerProvider>
				{/* <MouseFollowerProvider> */}
				{children}
				{/* </MouseFollowerProvider> */}
			</PointerFollowerProvider>
		</LocomotiveScrollProvider>
	);
}
