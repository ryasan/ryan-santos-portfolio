import { useEffect, useState } from 'react'

export const useMatchMedia = (mediaQuery: string, initialValue: boolean) => {
	const [isMatching, setIsMatching] = useState(initialValue)
	const [calculated, setCalculated] = useState(false)

	useEffect(() => {
		const watcher = window.matchMedia(mediaQuery)

		setIsMatching(watcher.matches)
		setCalculated(true)

		const listener = (matches: MediaQueryListEvent) => {
			setIsMatching(matches.matches)
		}

		if (watcher.addEventListener) {
			watcher.addEventListener('change', listener)
		} else {
			watcher.addListener(listener)
		}

		return () => {
			if (watcher.removeEventListener) {
				return watcher.removeEventListener('change', listener)
			} else {
				return watcher.removeListener(listener)
			}
		}
	}, [mediaQuery])

	return { calculated, isMatching }
}
