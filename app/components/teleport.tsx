// app/components/teleport.tsx
import { useEffect, useState, ReactNode, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

type TeleportProps = {
	children: ReactNode
	to: string
	onReady?: () => void
}

export default function Teleport({ children, to, onReady }: TeleportProps) {
	const [mounted, setMounted] = useState(false)
	const [target, setTarget] = useState<HTMLElement | null>(null)

	useEffect(() => {
		setMounted(true)
		const element = document.querySelector(to) as HTMLElement
		
		if (!element) {
			console.warn(`Teleport target "${to}" not found`)
		}
		
		setTarget(element)

		return () => setMounted(false)
	}, [to])

	useLayoutEffect(() => {
		if (mounted && target && onReady) {
			// Use RAF to ensure portal is painted
			requestAnimationFrame(() => {
				onReady()
			})
		}
	}, [mounted, target, onReady])

	if (!mounted || !target) return null

	return createPortal(children, target)
}
