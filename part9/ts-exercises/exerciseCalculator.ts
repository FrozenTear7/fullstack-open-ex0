// interface ExerciseValues {
//   exerciseHours: Array<number>
//   target: number
// }

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

// const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
//   if (args.length < 4) throw new Error('Not enough arguments')

//   const [target, ...exerciseHours] = args.slice(2).map(Number)

//   console.log(exerciseHours)
//   console.log(target)

//   if (!exerciseHours.some(isNaN) && !isNaN(target)) {
//     return {
//       exerciseHours,
//       target,
//     }
//   } else {
//     throw new Error('Provided values were not numbers!')
//   }
// }

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
  else
    return {
      ratingValue: 3,
      ratingMsg: niceMsg,
    }
}

export const calculateExercises = (
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

// try {
//   const { exerciseHours, target } = parseExerciseArguments(process.argv)
//   console.log(calculateExercises(exerciseHours, target))
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message)
// }
