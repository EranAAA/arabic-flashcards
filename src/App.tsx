import { Container, Typography, Grid, Box } from '@mui/material'
import { WordsProvider, useWords } from './context/WordsContext'

const CardGame = () => {
  const { words } = useWords()

  return (
    <Grid container spacing={2}>
      {words.map((word) => (
        <Grid item xs={6} sm={4} md={3} key={word.id}>
          <Box sx={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            fontSize: '1.5rem'
          }}>
            {word.arabic}
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default function App() {
  return (
    <WordsProvider>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Arabic Flashcards</Typography>
        <CardGame />
      </Container>
    </WordsProvider>
  )
}
