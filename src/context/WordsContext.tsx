import { createContext, useContext, useEffect, useMemo, useState } from "react"
import supabase from "../lib/supabaseClient"

type WordCategory = "all" | "verb" | "noun" | "adjective" | "greeting" | "possessive" | "number" | "question" | "expression" | "color"

type Word = {
	id: string
	arabic: string
	hebrew: string
	is_memorized?: boolean
	category?: WordCategory
}

type WordsContextType = {
	words: Word[]
	filteredWords: Word[]
	selectedCategory: WordCategory
	setSelectedCategory: (value: WordCategory) => void
	markAsMemorized: (id: string, newValue: boolean) => Promise<void>
}

const WordsContext = createContext<WordsContextType>({
	words: [],
	filteredWords: [],
	selectedCategory: "all",
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
			const { data, error } = await supabase.from("words").select("*")
			if (!error) setWords(data || [])
		}
		fetchWords()
	}, [])

	const markAsMemorized = async (id: string, newValue: boolean) => {
		await supabase.from("words").update({ is_memorized: newValue }).eq("id", id)

		setWords(prev => prev.map(w => (w.id === id ? { ...w, is_memorized: newValue } : w)))
	}

	return (
		<WordsContext.Provider
			value={{
				words,
				filteredWords,
				selectedCategory,
				setSelectedCategory,
				markAsMemorized,
			}}
		>
			{children}
		</WordsContext.Provider>
	)
}
