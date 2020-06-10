/* eslint-disable prefer-const */
import dotenv from 'dotenv'

dotenv.config({ silent: true })

let { PORT, MONGODB_URI, SECRET } = process.env

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

export default {
  MONGODB_URI,
  PORT,
  SECRET,
}
