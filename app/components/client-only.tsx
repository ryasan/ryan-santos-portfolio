import { useEffect, useState } from 'react'

type ClientOnlyProps = {
	children: React.ReactNode
}

export default function ClientOnly({ children }: ClientOnlyProps) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return isClient ? children : null
}
