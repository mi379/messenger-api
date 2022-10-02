import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import index from './routes/index.js'
import user from './routes/user.js'
import message from './routes/message.js'
import origin from './utils/origin.js'
import testConn from './middlewares/mongodb-test-connection.js'
import notFound from './middlewares/not-found-error.js'


export default express().use(
  express.urlencoded({
  	extended:false
  })
)
.use(
  express.json()
)
.use(
  cookieParser()
)
.use(
  cors({origin})
)
.use(
  logger('dev')
)
.use(
  '/',
  index
)
.use(
  testConn
)
.use(
  '/user',
  user
)
.use(
  '/message',
  message
)
.use(
  notFound
)



// export {
//   app
// }

