import { calculator } from './calculator';
import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.query;

  if (isNaN(Number(value1)) || isNaN(Number(value2))) {
    res.send({ error: 'malformatted parameters' });
  } else {
    const result = calculator(Number(value1), Number(value2), op);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
