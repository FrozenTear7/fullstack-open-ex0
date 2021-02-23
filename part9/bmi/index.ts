import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({ error: 'malformatted parameters' });
  } else {
    res.send({
      weight: weight,
      height: height,
      calculateBmi: calculateBmi(Number(height), Number(weight)),
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;
  console.log(dailyExercises);
  console.log(target);

  if (!target || !dailyExercises) {
    res.send({
      error: 'parameters missing',
    });
  } else if (
    isNaN(target) ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((x: string) => isNaN(Number(x)))
  ) {
    res.send({
      error: 'malformatted parameters',
    });
  } else {
    const result = calculateExercises(Number(target), dailyExercises);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
