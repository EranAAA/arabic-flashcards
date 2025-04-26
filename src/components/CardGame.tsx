import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Stack } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import { useWords } from "../context/WordsContext"
import { FlipCard } from "./FlipCard"
import { CategoryFilter } from "./CategoryFilter"
import { CategoryProgress } from "./CategoryProgress"

export const CardGame = () => {
	const navigate = useNavigate()

	const { filteredWords, markAsMemorized } = useWords()

	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [flipped, setFlipped] = useState(false)

	const showNextWord = () => {
		setFlipped(false)
		setCurrentIndex(prev => (prev + 1) % filteredWords.length)
	}

	const showPreviousWord = () => {
		setFlipped(false)
		setCurrentIndex(prev => (prev === 0 ? filteredWords.length - 1 : prev - 1))
	}

	const currentWord = currentIndex !== null ? filteredWords[currentIndex] : null

	return (
		<Box textAlign='center'>
			<CategoryFilter />
			<CategoryProgress />

			{currentWord && (
				<Box mb={3}>
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

					<Stack mt={3} sx={{ flexDirection: "row", justifyContent: "center", gap: "5px" }}>
						<Button
							size='small'
							variant='contained'
							startIcon={currentWord.is_memorized ? <BookmarkIcon /> : <BookmarkBorderIcon />}
							onClick={() => markAsMemorized(currentWord.id, !currentWord.is_memorized)}
							sx={{ width: "120px", gap: "10px" }}
						>
							{currentWord.is_memorized ? "בטל סימון" : "אני זוכר"}
						</Button>
						<Button
							size='small'
							variant='contained'
							onClick={() => navigate("/admin", { state: { currentWord } })}
							sx={{ width: "120px", gap: "10px" }}
						>
							{"ערוך מילה"}
						</Button>
					</Stack>
				</Box>
			)}

			{/* ✅ Always show the button */}
			<Stack mt={3} sx={{ flexDirection: "row", justifyContent: "center", gap: "5px" }}>
				<Button sx={{ width: "100px" }} size='small' variant='contained' onClick={showNextWord}>
					{"הבא"}
				</Button>
				<Button sx={{ width: "100px" }} size='small' variant='contained' onClick={showPreviousWord}>
					{"הקודם"}
				</Button>
			</Stack>
		</Box>
	)
}
