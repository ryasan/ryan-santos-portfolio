// Wrapper for all providers
import PointerFollowerProvider from '~/providers/pointer-follower'

export default function Providers({ children }: { children: React.ReactNode }) {
	return <PointerFollowerProvider>{children}</PointerFollowerProvider>
}
