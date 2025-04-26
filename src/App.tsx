import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import { WordsProvider } from "./context/WordsContext"
import { AppThemeProvider } from "./context/ThemeContext"
import { ThemeToggle } from "./components/ThemeToggle"
import { Logo } from "./components/Logo"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/adminPage"
import AdminToggle from "./components/AdminToggle"

export default function App() {
	return (
		<AppThemeProvider>
			<WordsProvider>
				<Container sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyontent: "flex-start" }}>
					<ThemeToggle />
					<Logo />

					{/* Routes */}
					<Router>
						<AdminToggle />
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/admin' element={<AdminPage />} />
						</Routes>
					</Router>
				</Container>
			</WordsProvider>
		</AppThemeProvider>
	)
}
