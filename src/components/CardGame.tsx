import { useState, useEffect } from "react"
import { Box, Button, Typography } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import { useWords } from "../context/WordsContext"
import { FlipCard } from "./FlipCard"
import supabase from "../lib/supabaseClient"

export const CardGame = () => {
	const { words, setWords } = useWords()
	const [currentIndex, setCurrentIndex] = useState<number | null>(null)
	const [flipped, setFlipped] = useState(false)

	const totalWords = words.length
	const memorizedWords = words.filter(w => w.is_memorized).length
	const unmemorizedWords = totalWords - memorizedWords

	const getRandomIndex = () => {
		const unmemorized = words.filter(w => /*!w.is_memorized*/ true)
		const pool = unmemorized.length > 0 ? unmemorized : words
		const randomWord = pool[Math.floor(Math.random() * pool.length)]
		return words.findIndex(w => w.id === randomWord.id)
	}

	useEffect(() => {
		if (words.length > 0) {
			setCurrentIndex(getRandomIndex())
		}
	}, [words])

	const showNextCard = () => {
		setFlipped(false)

		setTimeout(() => {
			setCurrentIndex(getRandomIndex())
		}, 100) // matches flip animation time
	}

	const markAsMemorized = async (id: string, newValue: boolean) => {
		await supabase.from("words").update({ is_memorized: newValue }).eq("id", id)

		setWords(prev => prev.map(w => (w.id === id ? { ...w, is_memorized: newValue } : w)))
	}

	const currentWord = currentIndex !== null ? words[currentIndex] : null

	return (
		<Box textAlign='center' mt={4}>
			<Typography variant='h4' gutterBottom>
				Arabic Flashcards
			</Typography>

			{currentWord ? (
				<Box mb={3}>
					<Typography variant='subtitle1' mb={2}>
						🧠 {memorizedWords} of {totalWords} words memorized
					</Typography>

					<FlipCard
						arabic={currentWord.arabic}
						hebrew={currentWord.hebrew}
						isMemorized={currentWord.is_memorized}
						flipped={flipped}
						onFlip={() => setFlipped(prev => !prev)}
					/>

					<Box mt={2}>
						<Button
							variant='contained'
							startIcon={currentWord.is_memorized ? <BookmarkIcon /> : <BookmarkBorderIcon />}
							onClick={() => markAsMemorized(currentWord.id, !currentWord.is_memorized)}
						>
							{currentWord.is_memorized ? "Unmark" : "Mark as memorized"}
						</Button>
					</Box>
				</Box>
			) : (
				<Typography variant='h6' color='text.secondary' mt={4}>
					🎉 You've memorized all the words!
				</Typography>
			)}

			{/* ✅ Always show the button */}
			<Box mt={3}>
				<Button variant='contained' onClick={showNextCard} disabled={words.length === 0}>
					Next Word
				</Button>
			</Box>
		</Box>
	)
}
