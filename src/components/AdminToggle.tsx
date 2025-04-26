import { useNavigate, useLocation } from "react-router-dom"
import { Button, Box } from "@mui/material"

export default function AdminToggle() {
	const navigate = useNavigate()
	const location = useLocation()

	const handleToggle = () => {
		if (location.pathname === "/admin") {
			navigate("/")
		} else {
			navigate("/admin")
		}
	}

	return (
		<Box sx={{ position: "absolute", top: "1%", left: "2%" }} textAlign='center'>
			<Button variant='contained' sx={{ marginTop: "3px", textTransform: "none", borderRadius: 4 }} onClick={handleToggle}>
				{location.pathname === "/admin" ? "חזרה למשחק" : "מעבר לניהול"}
			</Button>
		</Box>
	)
}
