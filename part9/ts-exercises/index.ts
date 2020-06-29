import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send({
      ...req.query,
      bmi: calculateBmi(Number(height), Number(weight)),
    })
  } else {
    res.send({
      error: 'malformatted parameters',
    })
  }
})

interface ExerciseBody {
  daily_exercises: Array<number>
  target: number
}

app.post('/exercises', (req, res) => {
  if (!req.body) {
    res.send({
      error: 'parameters missing',
    })
  } else {
    const { daily_exercises, target } = req.body as ExerciseBody

    if (!daily_exercises.some(isNaN) && !isNaN(target)) {
      res.send(calculateExercises(daily_exercises, target))
    } else {
      res.send({
        error: 'malformatted parameters',
      })
    }
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
