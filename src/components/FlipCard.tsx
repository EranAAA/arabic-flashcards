import React from "react"
import { Box, Typography, styled, Button } from "@mui/material"

type FlipCardProps = {
	arabic: string
	hebrew: string
	flipped: boolean
	onFlip: () => void
	isMemorized?: boolean // ✅ NEW
}

const CardWrapper = styled(Box)(() => ({
	perspective: "1000px",
	width: "100%",
	maxWidth: "320px", // wider than 250px
	height: "240px",
	margin: "0 auto",
	cursor: "pointer",
}))

const CardInner = styled(Box, {
	shouldForwardProp: prop => prop !== "flipped",
})<{ flipped: boolean }>(({ flipped }) => ({
	position: "relative",
	width: "100%",
	height: "100%",
	transition: "transform 0.6s",
	transformStyle: "preserve-3d",
	transform: flipped ? "rotateY(180deg)" : "none",
}))

const CardFace = styled(Box)(({ theme }) => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	borderRadius: theme.shape.borderRadius * 2, // extra roundness
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: theme.spacing(3),
	textAlign: "center",
	backfaceVisibility: "hidden",
	boxShadow: theme.shadows[6], // stronger shadow
	border: `1px solid ${theme.palette.divider}`, // subtle border
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.text.primary,
	transition: "background-color 0.3s, color 0.3s, transform 0.6s",
}))

const MemorizedChip = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: 8,
	right: 8,
	zIndex: 10,
	px: 1.5,
	py: 0.5,
	fontSize: "0.75rem",
	fontWeight: 600,
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.success.contrastText,
	backgroundColor: theme.palette.success.main,
	boxShadow: theme.shadows[2],
	padding: "2px 5px",
}))

const Front = styled(CardFace)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.text.primary,
}))

const Back = styled(CardFace)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	transform: "rotateY(180deg)",
}))

const CheckTranslateButton = styled(Button)(() => ({
	position: "absolute",
	bottom: 0,
	right: 0,
	mt: 1,
	color: "black",
	fontSize: "10px",
}))

export const FlipCard: React.FC<FlipCardProps> = ({ arabic, hebrew, isMemorized, flipped, onFlip }) => {
	const handleCheckTranslate = (e: any) => {
		e.stopPropagation() // so it doesn't flip
		window.open(`https://milon.madrasafree.com/?searchString=${encodeURIComponent(hebrew)}`, "_blank")
	}
	return (
		<CardWrapper onClick={onFlip}>
			{isMemorized && <MemorizedChip>Memorized</MemorizedChip>}

			<CardInner flipped={flipped}>
				<Front>
					<Typography variant='h5'>{arabic}</Typography>
				</Front>
				<Back>
					<CheckTranslateButton size='small' onClick={handleCheckTranslate}>
						Check Translate
					</CheckTranslateButton>
					<Typography variant='h5'>{hebrew}</Typography>
				</Back>
			</CardInner>
		</CardWrapper>
	)
}
