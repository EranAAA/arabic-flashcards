import { Container } from "@mui/material"
import { WordsProvider } from "./context/WordsContext"
import { AppThemeProvider } from "./context/ThemeContext"
import { CardGame } from "./components/CardGame"
import { ThemeToggle } from "./components/ThemeToggle"

export default function App() {
	return (
		<AppThemeProvider>
			<WordsProvider>
				<Container sx={{ mt: 4 }}>
					<ThemeToggle />
					<CardGame />
				</Container>
			</WordsProvider>
		</AppThemeProvider>
	)
}
