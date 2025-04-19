import React from 'react'
import { Box, Typography, styled } from '@mui/material'

type FlipCardProps = {
   arabic: string
   hebrew: string
   flipped: boolean
   onFlip: () => void
   isMemorized?: boolean // ✅ NEW
 }
 
const CardWrapper = styled(Box)(() => ({
  perspective: '1000px',
  width: '100%',
  maxWidth: '250px',
  height: '200px',
  margin: '0 auto',
  cursor: 'pointer',
}))

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'flipped',
})<{ flipped: boolean }>(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'none',
}))

const CardFace = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '-webkit-fill-available',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  fontSize: '1.5rem',
  fontWeight: 600,
  backfaceVisibility: 'hidden',
  textAlign: 'center',
}))

const Front = styled(CardFace)(({ theme }) => ({
  // backgroundColor: theme.palette.grey[100],
  backgroundColor: "grey",
  color: theme.palette.text.primary,
}))

const Back = styled(CardFace)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transform: 'rotateY(180deg)',
}))

export const FlipCard: React.FC<FlipCardProps> = ({ arabic, hebrew, isMemorized, flipped, onFlip }) => {
  return (
   <CardWrapper onClick={onFlip}>

   {isMemorized && (
     <Box
       sx={{
         position: 'absolute',
         top: 8,
         right: 8,
         zIndex: 10,
         bgcolor: 'success.main',
         color: 'green',
         fontSize: '0.75rem',
         fontWeight: 'bold',
         px: 1,
         py: 0.5,
         borderRadius: 1,
       }}
     >
       Memorized
     </Box>
   )}
 
   <CardInner flipped={flipped}>
     <Front>
       <Typography variant="h5">{arabic}</Typography>
     </Front>
     <Back>
       <Typography variant="h5">{hebrew}</Typography>
     </Back>
   </CardInner>
 </CardWrapper>
 
  )
}