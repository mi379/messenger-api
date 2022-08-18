#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http'
import app from '../app.js'
import origin from '../utils/origin.js'
import dbConnect from '../utils/mongodb-connect.js'
import watchDbsCollectionChg from '../utils/on-collection-change.js'
import handleSocket from '../utils/socket-io.js'
import mongoDbConnectionEvent from '../utils/mongodb-connection.js'
import * as socket from 'socket.io'

var httpServer = http.createServer(app)

httpServer.listen(process.env.PORT)

httpServer.on('listening',() => {
  console.log('ready to use')
  dbConnect(process.env.URI)
  watchDbsCollectionChg(app)
})

httpServer.on('error',(err) => {
  console.log(err.message)
  return process.exit(1)
})

app.socket = new socket.Server(
  httpServer,{cors:{origin}}
)  
.on('connect',(client) => {
  return handleSocket(
    app,client
  )
})

 
export default app