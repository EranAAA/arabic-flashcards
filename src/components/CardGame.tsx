import { useState, useEffect } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import { useWords } from "../context/WordsContext"
import { FlipCard } from "./FlipCard"
import { CategoryFilter } from "./CategoryFilter"
import { CategoryProgress } from "./CategoryProgress"

export const CardGame = () => {
	const { filteredWords, markAsMemorized } = useWords()

	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [flipped, setFlipped] = useState(false)

	const totalWords = filteredWords.length
	const memorizedWords = filteredWords.filter(w => w.is_memorized).length
	// const unmemorizedWords = totalWords - memorizedWords

	const showNextWord = () => {
		setCurrentIndex(prev => (prev + 1) % filteredWords.length)
	}

	const showPreviousWord = () => {
		setCurrentIndex(prev => (prev === 0 ? filteredWords.length - 1 : prev - 1))
	}

	const currentWord = currentIndex !== null ? filteredWords[currentIndex] : null

	return (
		<Box textAlign='center'>
			<CategoryFilter />
			<CategoryProgress />

			{currentWord ? (
				<Box mb={3}>
					<Typography variant='subtitle1' mb={2}>
						🧠 {memorizedWords} of {totalWords} words memorized
					</Typography>

					<FlipCard
						arabic={currentWord.arabic}
						hebrew={currentWord.hebrew}
						sentence_ar={currentWord.sentence_ar}
						sentence_he={currentWord.sentence_he}
						flipped={flipped}
						onFlip={() => setFlipped(prev => !prev)}
						isMemorized={currentWord.is_memorized}
						verbData={currentWord?.verb_data}
					/>

					<Box mt={2}>
						<Button
							size='small'
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
			<Stack mt={3} sx={{ flexDirection: "row", justifyContent: "center", gap: "5px" }}>
				<Button sx={{ width: "100px" }} size='small' variant='contained' onClick={showPreviousWord}>
					Previous
				</Button>
				<Button sx={{ width: "100px" }} size='small' variant='contained' onClick={showNextWord}>
					Next
				</Button>
			</Stack>
		</Box>
	)
}
