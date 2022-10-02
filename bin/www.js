#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http'
import app from '../app.js'
import origin from '../utils/origin.js'
import dbConnect from '../functions/dbConnect.js'
import handleDbConnectionEvent from '../functions/handleDbConnectionEvent.js'

var httpServer = http.createServer(app)

httpServer.listen(process.env.PORT)

httpServer.on('listening',() => {
  handleDbConnectionEvent(app)
  dbConnect(process.env.DBURI)
})


httpServer.on('error',(err) => {
  console.log(
  	err.message
  )
  
  process.exit(
  	1
  )
})
 