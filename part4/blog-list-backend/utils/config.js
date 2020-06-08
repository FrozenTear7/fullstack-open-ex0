import dotenv from 'dotenv'

dotenv.config({ silent: true })

const { PORT, MONGODB_URI } = process.env

export default {
  MONGODB_URI,
  PORT,
}
