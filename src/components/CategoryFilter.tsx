import { Box, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material"
import { useWords } from "../context/WordsContext"

const categories = [
	{ value: "all", label: "הכול" },
	{ value: "greeting", label: "ברכות" },
	{ value: "verb", label: "פעלים" },
	{ value: "noun", label: "שמות עצם" },
	{ value: "adjective", label: "תארים" },
	{ value: "color", label: "צבעים" },
	{ value: "possessive", label: "שייכות" },
	{ value: "question", label: "שאלות" },
	{ value: "expression", label: "ביטויים" },
]

export const CategoryFilter = () => {
	const { selectedCategory, setSelectedCategory } = useWords()

	return (
		<Box mb={3}>
			<Typography variant='subtitle1' sx={{ color: "text.primary", mb: 1, textAlign: "center" }}>
				Choose Category
			</Typography>

			<RadioGroup
				row
				value={selectedCategory}
				onChange={e => setSelectedCategory(e.target.value as typeof selectedCategory)}
				sx={{ justifyContent: "center" }} // ✅ added style
			>
				{categories.map(cat => (
					<FormControlLabel key={cat.value} value={cat.value} control={<Radio />} label={cat.label} />
				))}
			</RadioGroup>
		</Box>
	)
}
