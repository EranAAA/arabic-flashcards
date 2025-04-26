import React from "react"
import { Box, Typography, styled, Stack } from "@mui/material"
import { VerbData } from "../context/WordsContext"

type FlipCardProps = {
	arabic: string
	hebrew: string
	flipped: boolean
	onFlip: () => void
	isMemorized?: boolean // ✅ NEW
	sentence_ar?: string
	sentence_he?: string
	verbData?: VerbData
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
	direction: "rtl",
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
	flexDirection: "column",
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
	backgroundColor: theme.palette.primary.light,
	color: theme.palette.primary.contrastText,
	transform: "rotateY(180deg)",
}))

const Info = styled("div")(({ bottom, right, top, left }: { bottom?: number; right?: number; top?: number; left?: number }) => ({
	position: "absolute",
	bottom: bottom ?? "unset",
	right: right ?? "unset",
	top: top ?? "unset",
	left: left ?? "unset",
	color: "black",
	padding: "10px",
	fontSize: "14px",
}))

export const FlipCard: React.FC<FlipCardProps> = ({ arabic, hebrew, sentence_ar, sentence_he, isMemorized, verbData, flipped, onFlip }) => {
	const handleCheckTranslate = (e: any) => {
		e.stopPropagation() // so it doesn't flip
		window.open(`https://milon.madrasafree.com/?searchString=${encodeURIComponent(hebrew)}`, "_blank")
	}
	return (
		<CardWrapper onClick={onFlip}>
			{isMemorized && <MemorizedChip>Memorized</MemorizedChip>}

			<CardInner flipped={flipped}>
				<Front>
					<Info left={0} top={0}>
						{verbData?.binyan}
					</Info>
					<Info right={0} top={0}>
						{verbData?.pronoun}
					</Info>
					<Info left={0} bottom={0}>
						{verbData?.root}
					</Info>

					<Typography variant='h5'>{arabic}</Typography>
					{verbData && (
						<Stack>
							<Typography variant='body2' color='inherit' sx={{ fontStyle: "italic", direction: "rtl" }}>
								{"הווה: " + verbData.present}
							</Typography>
							<Typography variant='body2' color='inherit' sx={{ fontStyle: "italic", direction: "rtl" }}>
								{"עתיד: " + verbData.future}
							</Typography>
						</Stack>
					)}
					<Typography variant='body2' color='inherit' sx={{ mt: 2, fontStyle: "italic", direction: "rtl" }}>
						{sentence_ar}
					</Typography>
				</Front>
				<Back>
					<Info right={0} bottom={0} onClick={handleCheckTranslate}>
						{"בדוק מילה"}
					</Info>
					<Typography variant='h5'>{hebrew}</Typography>
					<Typography variant='body2' color='inherit' sx={{ mt: 2, fontStyle: "italic", direction: "rtl" }}>
						{sentence_he}
					</Typography>
				</Back>
			</CardInner>
		</CardWrapper>
	)
}
