import { createContext, useContext, useEffect, useState } from "react"
import supabase from "../lib/supabaseClient"

type Word = {
	id: string
	arabic: string
	hebrew: string
	is_memorized?: boolean
}

type WordsContextType = {
	words: Word[]
	setWords: React.Dispatch<React.SetStateAction<Word[]>>
}

const WordsContext = createContext<WordsContextType>({
	words: [],
	setWords: () => {},
})

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

	return <WordsContext.Provider value={{ words, setWords }}>{children}</WordsContext.Provider>
}
