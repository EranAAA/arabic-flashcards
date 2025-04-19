import { createContext, useContext, useMemo, useState } from "react"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"

type Mode = "light" | "dark"

type ThemeContextType = {
	mode: Mode
	toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	mode: "light",
	toggleMode: () => {},
})

export const useAppTheme = () => useContext(ThemeContext)

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<Mode>(() => {
		const stored = localStorage.getItem("theme")
		return stored === "dark" ? "dark" : "light"
	})

	const toggleMode = () => {
		setMode(prev => {
			const next = prev === "light" ? "dark" : "light"
			localStorage.setItem("theme", next)
			return next
		})
	}

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

	return (
		<ThemeContext.Provider value={{ mode, toggleMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}
