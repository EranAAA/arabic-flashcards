import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Box, Button, MenuItem, Stack } from "@mui/material"
import { useSnackbar } from "notistack"
import { useWords, Word } from "../context/WordsContext"
import supabase from "../lib/supabaseClient"
import { RtlTextField } from "../components/RtlTextField"
import { categories } from "../components/CategoryFilter"

export default function AdminPage() {
	const location = useLocation()
	const { enqueueSnackbar } = useSnackbar()

	const { words, setWords } = useWords()

	const [selectedWordId, setSelectedWordId] = useState<string | null>(null)
	const [currentWord, setCurrentWord] = useState<Partial<Word>>({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const { state } = location
		if (state && state.hasOwnProperty("currentWord")) {
			setSelectedWordId(state?.currentWord?.id)
			setCurrentWord(state?.currentWord)
		}
	}, [location])

	const handleSelectWord = (id: string) => {
		const found = words.find(w => w.id === id)
		if (found) {
			setCurrentWord(found)
			setSelectedWordId(id)
		}
	}

	const handleAddNew = () => {
		setCurrentWord({})
		setSelectedWordId(null)
	}

	const handleSave = async () => {
		setLoading(true)
		const flatRow = { ...currentWord, ...currentWord.verb_data }
		delete flatRow.verb_data
		if (currentWord.category === "verb") delete flatRow.category

		try {
			if (currentWord.id) {
				// Update
				await supabase
					.from(currentWord.category === "verb" ? "verbs" : "words")
					.update(flatRow)
					.eq("id", currentWord.id)

				setWords(prev => prev.map(w => (w.id === currentWord.id ? { ...w, ...currentWord } : w)))

				enqueueSnackbar("Updated successfully!", { variant: "success" })
			} else {
				// Insert
				const { data, error } = await supabase
					.from(currentWord.category === "verb" ? "verbs" : "words")
					.insert([flatRow])
					.select()
					.single()

				if (error) throw error

				setWords(prev => [...prev, data])

				enqueueSnackbar("Added successfully!", { variant: "success" })
			}
		} catch (error) {
			console.error(error)
			enqueueSnackbar("Something went wrong.", { variant: "error" })
		}
		setLoading(false)
	}

	const handleDelete = async () => {
		if (!currentWord.id) return
		const confirm = window.confirm("האם אתה בטוח?")
		if (!confirm) return

		setLoading(true)

		try {
			await supabase
				.from(currentWord.category === "verb" ? "verbs" : "words")
				.delete()
				.eq("id", currentWord.id)

			setWords(prev => prev.filter(w => w.id !== currentWord.id))
			setCurrentWord({})
			setSelectedWordId(null)

			enqueueSnackbar("Deleted successfully!", { variant: "success" })
		} catch (error) {
			console.error(error)
			enqueueSnackbar("Something went wrong.", { variant: "error" })
		}

		setLoading(false)
	}

	return (
		<Box p={2}>
			{/* Search Dropdown + Add New */}
			<Box display='flex' gap={2} mb={3}>
				<RtlTextField
					size='small'
					select
					label='בחר מילה'
					value={selectedWordId || ""}
					onChange={e => handleSelectWord(e.target.value)}
					fullWidth
				>
					{words.map(word => (
						<MenuItem dir='rtl' key={word.id} value={word.id}>
							{word.hebrew}
						</MenuItem>
					))}
				</RtlTextField>

				<Button sx={{ width: "50%" }} variant='outlined' onClick={handleAddNew}>
					{"הוסף חדש"}
				</Button>
			</Box>

			{/* Form */}
			<Box display='flex' flexDirection='column' gap={1.5}>
				<RtlTextField
					label='ערבית'
					size='small'
					value={currentWord.arabic || ""}
					onChange={e => setCurrentWord({ ...currentWord, arabic: e.target.value })}
					fullWidth
				/>

				<RtlTextField
					label='עברית'
					size='small'
					value={currentWord.hebrew || ""}
					onChange={e => setCurrentWord({ ...currentWord, hebrew: e.target.value })}
					fullWidth
				/>

				<RtlTextField
					select
					label='קטגוריה'
					size='small'
					value={currentWord.category || ""}
					onChange={e => {
						const newCategory = e.target.value as Word["category"]
						setCurrentWord(prev => ({
							...prev,
							category: newCategory,
							verb_data: newCategory === "verb" ? {} : undefined,
						}))
					}}
					fullWidth
				>
					{categories
						.filter((_, idx) => idx)
						.map(category => (
							<MenuItem dir='rtl' value={category.value}>
								{category.label}
							</MenuItem>
						))}
				</RtlTextField>

				{currentWord.category === "verb" && (
					<>
						<Stack flexDirection={"row"} gap={"8px"}>
							<RtlTextField
								label='שורש'
								size='small'
								value={currentWord.verb_data?.root || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, root: e.target.value },
									}))
								}
								fullWidth
							/>

							<RtlTextField
								label='בניין'
								size='small'
								value={currentWord.verb_data?.binyan || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, binyan: e.target.value },
									}))
								}
								fullWidth
							/>
						</Stack>

						<Stack flexDirection={"row"} gap={"8px"}>
							<RtlTextField
								label='עבר'
								size='small'
								value={currentWord.verb_data?.past || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, past: e.target.value },
									}))
								}
							/>
							<RtlTextField
								label='שייכות'
								size='small'
								value={currentWord.verb_data?.pronoun || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, pronoun: e.target.value },
									}))
								}
							/>
						</Stack>
						<Stack flexDirection={"row"} gap={"8px"}>
							<RtlTextField
								label='הווה'
								size='small'
								value={currentWord.verb_data?.present || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, present: e.target.value },
									}))
								}
							/>
							<RtlTextField
								label='עתיד'
								size='small'
								value={currentWord.verb_data?.future || ""}
								onChange={e =>
									setCurrentWord(prev => ({
										...prev,
										verb_data: { ...prev.verb_data, future: e.target.value },
									}))
								}
							/>
						</Stack>
					</>
				)}

				<RtlTextField
					label='משפט בערבית'
					size='small'
					value={currentWord.sentence_ar || ""}
					onChange={e => setCurrentWord({ ...currentWord, sentence_ar: e.target.value })}
					fullWidth
				/>

				<RtlTextField
					label='משפט בעברית'
					size='small'
					value={currentWord.sentence_he || ""}
					onChange={e => setCurrentWord({ ...currentWord, sentence_he: e.target.value })}
					fullWidth
				/>

				<Button variant='contained' onClick={handleSave} disabled={loading}>
					{currentWord.id ? "Edit" : "Save"}
				</Button>
				{currentWord.id && (
					<Button variant='outlined' color='error' onClick={handleDelete} disabled={loading}>
						Delete
					</Button>
				)}
			</Box>
		</Box>
	)
}
