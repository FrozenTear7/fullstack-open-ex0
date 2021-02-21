interface CalculatorValues {
  target: number
  exerciseData: Array<number>
}

interface CalculatedData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: number
  ratingDescription: string
}

const calculateRating = (avg: number, target: number): Rating => {
  if (avg >= 2 * target) {
    return { rating: 3, ratingDescription: 'Amazing' }
  } else if (avg < 2 * target && avg > 0.5 * target) {
    return { rating: 2, ratingDescription: 'Mediocre' }
  } else {
    return { rating: 1, ratingDescription: 'Bro..' }
  }
}

const calculateExercises = (
  target: number,
  exerciseData: Array<number>
): CalculatedData => {
  const avg = exerciseData.reduce((acc, val) => acc + val) / exerciseData.length
  const { rating, ratingDescription } = calculateRating(avg, target)

  return {
    periodLength: exerciseData.length,
    trainingDays: exerciseData.filter((x) => x > 0).length,
    success: avg > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg,
  }
}

const parseArguments = (args: Array<string>): CalculatorValues => {
  args = args.splice(2)
  console.log(args)
  if (args.length < 4) throw new Error('Wrong number of arguments')

  if (!args.some((x) => isNaN(Number(x)))) {
    const [target, ...exerciseData] = args
    return {
      exerciseData: exerciseData.map((x) => Number(x)),
      target: Number(target),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

try {
  const { target, exerciseData } = parseArguments(process.argv)
  console.log(calculateExercises(target, exerciseData))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
