import { Box, useTheme } from "@mui/material"
import logo from "../assets/arabic-text-logo.png"

export const Logo = () => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				width: 130,
				mx: "auto",
				py: 2,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 2,
			}}
		>
			<img
				src={logo}
				alt='Arabic Flashcards Logo'
				style={{
					maxWidth: "80%",
					height: "auto",
					filter: theme.palette.mode === "dark" ? "brightness(8.5)" : "none",
				}}
			/>
		</Box>
	)
}
