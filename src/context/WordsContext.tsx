import { createContext, useContext, useEffect, useMemo, useState } from "react"
import supabase from "../lib/supabaseClient"
import { shuffleArray } from "../utils/helpers"

type WordCategory = "all" | "verb" | "noun" | "adjective" | "greeting" | "possessive" | "number" | "question" | "expression" | "color"

export type Word = {
	id: string
	arabic: string
	hebrew: string
	category?: WordCategory
	is_memorized?: boolean
	sentence_ar?: string
	sentence_he?: string
	verb_data?: VerbData
}

export type VerbData = {
	root?: string
	binyan?: string
	past?: string
	present?: string
	future?: string
	pronoun?: string
}

type CategoryProgress = {
	category: WordCategory
	total: number
	memorized: number
}

type WordsContextType = {
	words: Word[]
	filteredWords: Word[]
	selectedCategory: WordCategory
	setSelectedCategory: (value: WordCategory) => void
	markAsMemorized: (id: string, newValue: boolean) => Promise<void>
	categoryProgress: CategoryProgress[]
}

const WordsContext = createContext<WordsContextType>({
	words: [],
	filteredWords: [],
	selectedCategory: "all",
	categoryProgress: [],
	setSelectedCategory: () => {},
	markAsMemorized: async () => {},
})

export const useWords = () => useContext(WordsContext)

export const WordsProvider = ({ children }: { children: React.ReactNode }) => {
	const [words, setWords] = useState<Word[]>([])
	const [selectedCategory, setSelectedCategory] = useState<WordCategory>("all")

	const filteredWords = useMemo(() => {
		return selectedCategory === "all" ? words : words.filter(w => w.category === selectedCategory)
	}, [words, selectedCategory])

	useEffect(() => {
		const fetchWords = async () => {
			const [wordsResult, verbsResult] = await Promise.all([supabase.from("words").select("*"), supabase.from("verbs").select("*")])
			const wordItems: Word[] = wordsResult?.data?.length ? [...wordsResult.data] : []
			const verbItems: Word[] = verbsResult?.data?.length
				? verbsResult.data.map(row => ({
						...row,
						category: "verb",
						verb_data: {
							root: row.root,
							binyan: row.binyan,
							past: row.past,
							present: row.present,
							future: row.future,
							pronoun: row.pronoun,
						},
				  }))
				: []

			const fetchedWords = [...wordItems, ...verbItems]
			const shuffledWords = shuffleArray(fetchedWords)
			setWords(shuffledWords)
		}
		fetchWords()
	}, [])

	const markAsMemorized = async (id: string, newValue: boolean) => {
		await supabase.from("words").update({ is_memorized: newValue }).eq("id", id)
		setWords(prev => prev.map(w => (w.id === id ? { ...w, is_memorized: newValue } : w)))
	}

	const categoryProgress = useMemo<CategoryProgress[]>(() => {
		const groups: Record<WordCategory, { total: number; memorized: number }> = {} as any

		for (const word of words) {
			if (!word.category) continue
			const cat = word.category

			if (!groups[cat]) {
				groups[cat] = { total: 0, memorized: 0 }
			}

			groups[cat].total++
			if (word.is_memorized) groups[cat].memorized++
		}

		return Object.entries(groups).map(([category, { total, memorized }]) => ({
			category: category as WordCategory,
			total,
			memorized,
		}))
	}, [words])

	return (
		<WordsContext.Provider
			value={{
				words,
				filteredWords,
				selectedCategory,
				categoryProgress,
				setSelectedCategory,
				markAsMemorized,
			}}
		>
			{children}
		</WordsContext.Provider>
	)
}
