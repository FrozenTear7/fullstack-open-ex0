import { calculateBmi } from './bmiCalculator'
import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({ error: 'malformatted parameters' })
  } else {
    res.send({
      weight: weight,
      height: height,
      calculateBmi: calculateBmi(Number(height), Number(weight)),
    })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
