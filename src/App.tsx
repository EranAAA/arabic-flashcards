import { Container } from "@mui/material"
import { WordsProvider } from "./context/WordsContext"
import { CardGame } from "./components/CardGame"

export default function App() {
	return (
		<WordsProvider>
			<Container sx={{ mt: 4 }}>
				<CardGame />
			</Container>
		</WordsProvider>
	)
}
