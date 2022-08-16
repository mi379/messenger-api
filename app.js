

import cors from 'cors'
import express from 'express'
import logger from 'morgan'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import app from './utils/express.js'
import apiIndexPage from './routes/index.js'
import signIn from './routes/signIn.js'
import message from './routes/message.js'
import testDbConnection from './utils/testConnection.js'

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({origin: '*'})
)

app.use(
  express.urlencoded({
  	extended: false
  })
)

app.use('/',apiIndexPage);

app.use(testDbConnection);
app.use('/signin',signIn);
app.use('/message',message);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(
    `${err.status}:${err.message}`
  )
})

export {
  app
}

