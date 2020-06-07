import http from 'http'
import app from './app.mjs'
import config from './utils/config.mjs'
import logger from './utils/logger.mjs'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
