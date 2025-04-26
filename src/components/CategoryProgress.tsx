import { Stack } from "@mui/material"
import { useWords } from "../context/WordsContext"
import { Chip } from "@mui/material"

const categoryLabels: Record<string, string> = {
	greeting: "🗣️ Greetings",
	verb: '📚 Verbs',
	noun: "📦 Nouns",
	adjective: "🎯 Adjectives",
	color: "🎨 Colors",
	possessive: "👤 Possessives",
	question: "❓ Questions",
	expression: "💬 Expressions",
}

export const CategoryProgress = () => {
	const { categoryProgress } = useWords()

	return (
		<Stack direction='row' justifyContent='center' flexWrap='wrap' gap={1} pb={2}>
			{categoryProgress.map(({ category, total, memorized }) => {
				const label = categoryLabels[category] || category
				return (
					<Chip
						key={category}
						label={`${label} ${memorized}/${total}`}
						color={memorized === total ? "success" : "default"}
						variant='outlined'
						size='small'
					/>
				)
			})}
		</Stack>
	)
}
