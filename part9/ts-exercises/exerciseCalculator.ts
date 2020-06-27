interface ExercisesResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  ratingValue: number
  ratingMsg: string
}

const getRating = (avg: number, target: number): Rating => {
  const badMsg = 'BRUH',
    okMsg = 'not too shabby',
    niceMsg = 'doing great there champ :)'

  if (avg < target - 1)
    return {
      ratingValue: 1,
      ratingMsg: badMsg,
    }
  else if (avg >= target - 1 && avg < target + 1)
    return {
      ratingValue: 2,
      ratingMsg: okMsg,
    }
  else if (avg > target + 1)
    return {
      ratingValue: 3,
      ratingMsg: niceMsg,
    }
}

const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): ExercisesResult => {
  const avg =
    exerciseHours.reduce((total, curVal) => total + curVal, 0) /
    exerciseHours.length

  const { ratingValue, ratingMsg } = getRating(avg, target)

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((day) => day > 0).length,
    success: avg >= target ? true : false,
    rating: ratingValue,
    ratingDescription: ratingMsg,
    target: target,
    average: avg,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
