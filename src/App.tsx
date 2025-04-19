import { useMemo } from "react"
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"
import { Container } from "@mui/material"
import { WordsProvider } from "./context/WordsContext"
import { CardGame } from "./components/CardGame"

export default function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	)
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<WordsProvider>
				<Container sx={{ mt: 4 }}>
					<CardGame />
				</Container>
			</WordsProvider>
		</ThemeProvider>
	)
}
