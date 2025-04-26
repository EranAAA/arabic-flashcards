import { createContext, useContext, useMemo, useState } from "react"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import rtlPlugin from "stylis-plugin-rtl"
import { prefixer } from "stylis"

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

	const cacheRtl = createCache({
		key: "muirtl",
		stylisPlugins: [prefixer, rtlPlugin],
	})

	const theme = useMemo(() => createTheme({ palette: { mode }, direction: "rtl" }), [mode])

	return (
		<CacheProvider value={cacheRtl}>
			<ThemeContext.Provider value={{ mode, toggleMode }}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</ThemeContext.Provider>
		</CacheProvider>
	)
}
