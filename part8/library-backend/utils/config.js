/* eslint-disable prefer-const */
import dotenv from 'dotenv'

dotenv.config({ silent: true })

let { MONGODB_URI, SECRET } = process.env

export default {
  MONGODB_URI,
  SECRET,
}
