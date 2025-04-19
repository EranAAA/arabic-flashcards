import { Box, useTheme } from "@mui/material"
import logo from "../assets/arabic-text-logo.png"

export const Logo = () => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				width: 160,
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
					maxWidth: "100%",
					height: "auto",
					filter: theme.palette.mode === "dark" ? "brightness(1.3)" : "none",
				}}
			/>
		</Box>
	)
}
