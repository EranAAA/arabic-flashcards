import { useState } from "react"
import { Button, Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useWords, Word } from "../context/WordsContext"
import supabase from "../lib/supabaseClient"

export default function AdminPage() {
	const { words } = useWords()

	const [mode, setMode] = useState<"words" | "verbs">("words")

	const handleRowEdit = async (updatedRow: Word) => {
		if (updatedRow.category === "verb") {
			await supabase
				.from("verbs")
				.update({
					past: updatedRow.arabic,
					hebrew: updatedRow.hebrew,
					root: updatedRow.verb_data?.root,
					binyan: updatedRow.verb_data?.binyan,
					present: updatedRow.verb_data?.present,
					future: updatedRow.verb_data?.future,
					pronoun: updatedRow.verb_data?.pronoun,
				})
				.eq("id", updatedRow.id)
		} else {
			await supabase
				.from("words")
				.update({
					arabic: updatedRow.arabic,
					hebrew: updatedRow.hebrew,
					category: updatedRow.category,
					sentence_ar: updatedRow.sentence_ar,
					sentence_he: updatedRow.sentence_he,
				})
				.eq("id", updatedRow.id)
		}
		// fetchAll()
		return updatedRow // ✅ Important!
	}

	const wordColumns: GridColDef[] = [
		{ field: "arabic", headerName: "Arabic", width: 150, editable: true },
		{ field: "hebrew", headerName: "Hebrew", width: 150, editable: true },
		{ field: "category", headerName: "Category", width: 120, editable: true },
		{ field: "sentence_ar", headerName: "Sentence (Arabic)", width: 250, editable: true },
		{ field: "sentence_he", headerName: "Sentence (Hebrew)", width: 250, editable: true },
	]

	const verbColumns: GridColDef[] = [
		{ field: "arabic", headerName: "Past (Arabic)", width: 150, editable: true },
		{ field: "hebrew", headerName: "Hebrew", width: 150, editable: true },
		{ field: "root", headerName: "Root", width: 120, editable: true },
		{ field: "binyan", headerName: "Binyan", width: 120, editable: true },
		{ field: "past", headerName: "Past", width: 150, editable: true },
		{ field: "present", headerName: "Present", width: 150, editable: true },
		{ field: "future", headerName: "Future", width: 150, editable: true },
		{ field: "pronoun", headerName: "Pronoun", width: 100, editable: true },
		{ field: "sentence_ar", headerName: "Sentence (Arabic)", width: 250, editable: true },
		{ field: "sentence_he", headerName: "Sentence (Hebrew)", width: 250, editable: true },
	]

	return (
		<Box p={2}>
			<Box mb={2} textAlign={"center"}>
				<Button onClick={() => setMode("words")}>Words</Button>
				<Button onClick={() => setMode("verbs")}>Verbs</Button>
			</Box>

			<Box
				sx={{
					width: "100vw",
					height: "80vh", // << important!
					overflowX: "auto",
				}}
			>
				<DataGrid
					rows={words.filter(w => (mode === "words" ? w.category !== "verb" : w.category === "verb"))}
					columns={mode === "words" ? wordColumns : verbColumns}
					editMode='row' // <<< This replaces experimentalFeatures
					processRowUpdate={handleRowEdit}
					sx={{
						width: "100%",
						"& .MuiDataGrid-columnHeaders": {
							position: "sticky",
							top: 0,
							backgroundColor: "background.default",
							zIndex: 2,
						},
					}}
					autoHeight={false} // << IMPORTANT: must be false!
				/>
			</Box>
		</Box>
	)
}
