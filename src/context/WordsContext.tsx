import { createContext, useContext, useEffect, useState } from "react"
import supabase from "../lib/supabaseClient"

type Word = {
	id: string
	arabic: string
	hebrew: string
}

type WordsContextType = {
	words: Word[]
}

const WordsContext = createContext<WordsContextType>({ words: [] })

export const useWords = () => useContext(WordsContext)

export const WordsProvider = ({ children }: { children: React.ReactNode }) => {
	const [words, setWords] = useState<Word[]>([])

	useEffect(() => {
		const fetchWords = async () => {
			const { data, error } = await supabase.from("words").select("*")
			if (!error) setWords(data || [])
		}
		fetchWords()
	}, [])

	return <WordsContext.Provider value={{ words }}>{children}</WordsContext.Provider>
}
