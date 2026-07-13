import { createContext, useContext } from 'react'
import { type Theme } from '~/types'

type ThemeContextType = [Theme | null, React.Dispatch<React.SetStateAction<Theme | null>>]

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useThemeContext() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useThemeContext must be used within a ThemeProvider')
	}
	return context
}
