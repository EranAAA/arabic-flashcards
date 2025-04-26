import { Container } from "@mui/material"
import { WordsProvider } from "./context/WordsContext"
import { AppThemeProvider } from "./context/ThemeContext"
import { CardGame } from "./components/CardGame"
import { ThemeToggle } from "./components/ThemeToggle"
import { Logo } from "./components/Logo"

export default function App() {
	return (
		<AppThemeProvider>
			<WordsProvider>
				<Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyontent: "flex-start" }}>
					<ThemeToggle />
					<Logo />
					<CardGame />
				</Container>
			</WordsProvider>
		</AppThemeProvider>
	)
}
