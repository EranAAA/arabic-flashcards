import { Button, Box, Typography } from "@mui/material"
import { useWords } from "../context/WordsContext"
import { useState, useEffect } from "react"
import { FlipCard } from "./FlipCard"

export const CardGame = () => {
	const { words } = useWords()
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)
	const [flipped, setFlipped] = useState(false)

	const getRandomIndex = () => {
		if (words.length === 0) return null
		return Math.floor(Math.random() * words.length)
	}

	useEffect(() => {
		setCurrentIndex(getRandomIndex())
	}, [words])

	const showNextCard = () => {
		setFlipped(false) // ✅ reset to Arabic side
		setCurrentIndex(getRandomIndex())
	}

	const currentWord = currentIndex !== null ? words[currentIndex] : null

	return (
		<Box textAlign='center' mt={4}>
			<Typography variant='h4' gutterBottom>
				Arabic Flashcards
			</Typography>

			{currentWord && (
				<Box mb={3}>
					<FlipCard arabic={currentWord.arabic} hebrew={currentWord.hebrew} flipped={flipped} onFlip={() => setFlipped(prev => !prev)} />
				</Box>
			)}

			<Button variant='contained' onClick={showNextCard} disabled={words.length === 0}>
				Next Word
			</Button>
		</Box>
	)
}
