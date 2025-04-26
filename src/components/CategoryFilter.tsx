import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { useWords } from "../context/WordsContext"

const categories = [
	{ value: "all", label: "all" },
	{ value: "greeting", label: "greeting (ברכות)" },
	{ value: "verb", label: "verb (פעלים)" },
	{ value: "noun", label: "noun (שמות עצם)" },
	{ value: "adjective", label: "adjective (תארים)" },
	{ value: "color", label: "color (צבעים)" },
	{ value: "possessive", label: "possessive (שייכות)" },
	{ value: "question", label: "question (שאלות)" },
	{ value: "expression", label: "expression (ביטויים)" },
]

export const CategoryFilter = () => {
	const { selectedCategory, setSelectedCategory } = useWords()

	return (
		<Box mb={3} width='100%' maxWidth={300} mx='auto'>
			<FormControl fullWidth size='small'>
				<InputLabel id='category-select-label'>Choose Category</InputLabel>
				<Select
					labelId='category-select-label'
					value={selectedCategory}
					onChange={e => setSelectedCategory(e.target.value as typeof selectedCategory)}
					label='Choose Category'
					sx={{ textTransform: "capitalize" }}
				>
					{categories.map(cat => (
						<MenuItem key={cat.value} value={cat.value} sx={{ textTransform: "capitalize" }}>
							{cat.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}
