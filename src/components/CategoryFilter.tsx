import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { useWords } from "../context/WordsContext"

export const categories = [
	{ value: "all", label: "הכל" },
	{ value: "greeting", label: "ברכות" },
	{ value: "verb", label: "פעלים" },
	{ value: "noun", label: "שמות עצם" },
	{ value: "adjective", label: "תארים" },
	{ value: "color", label: "צבעים" },
	{ value: "possessive", label: "שייכות" },
	{ value: "question", label: "שאלות" },
	{ value: "expression", label: "ביטויים" },
	{ value: "number", label: "מספרים" },
]

export const CategoryFilter = () => {
	const { selectedCategory, setSelectedCategory } = useWords()

	return (
		<Box mb={3} width='100%' maxWidth={300} mx='auto'>
			<FormControl fullWidth size='small'>
				<InputLabel id='category-select-label'>{"בחר קטגוריה"}</InputLabel>
				<Select
					labelId='category-select-label'
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value as typeof selectedCategory)}
					label='בחר קטגוריה'
					sx={{ textTransform: "capitalize" }}
				>
					{categories.map(cat => (
						<MenuItem key={cat.value} value={cat.value} sx={{ textTransform: "capitalize", direction: "ltr" }}>
							{cat.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}
