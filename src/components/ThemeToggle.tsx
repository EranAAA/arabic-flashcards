import { IconButton } from "@mui/material"
import { useAppTheme } from "../context/ThemeContext"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

export const ThemeToggle = () => {
	const { mode, toggleMode } = useAppTheme()

	return (
		<IconButton
			disableFocusRipple
			sx={{
				position: "absolute",
				top: "1%",
				right: "2%",
				"&:focus": { outline: "none" },
				"&:focus-visible": { outline: "none", boxShadow: "none" },
			}}
			onClick={toggleMode}
			color='inherit'
		>
			{mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	)
}
