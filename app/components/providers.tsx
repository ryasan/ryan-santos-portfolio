import LocomotiveScrollProvider from '~/context/locomotive-scroll-context';
import MouseFollowerProvider from '~/context/mouse-follower-context';

type ProvidersProps = {
	children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
	return (
		<LocomotiveScrollProvider>
			<MouseFollowerProvider>{children}</MouseFollowerProvider>
		</LocomotiveScrollProvider>
	);
}
