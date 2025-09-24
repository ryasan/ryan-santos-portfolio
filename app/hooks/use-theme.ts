import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		// Initialize from localStorage or default to 'dark'
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') as Theme
			return savedTheme || 'dark'
		}
		return 'dark'
	})

	// Update localStorage when theme changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', theme)
			// Update document dataset attribute for CSS theming
			document.documentElement.dataset.theme = theme
		}
	}, [theme])

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
	}

	return {
		theme,
		setTheme,
		toggleTheme,
	}
}
