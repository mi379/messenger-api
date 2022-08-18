#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {app} from '../app.js'
import {Server} from 'socket.io'
import {createServer} from 'http'
import {dbConnect} from '../utils/mongodb-connect.js'
import {watchDbsCollectionChg} from '../utils/on-collection-change.js'
import {handleSocket} from '../utils/socket-io.js'


var httpServer = createServer(app)


httpServer.listen(process.env.PORT)

httpServer.on('listening',() => {
  dbConnect(process.env.URI)
  watchDbsCollectionChg(app)
})

httpServer.on('error',(err) => {
  console.log(err.message)
  return process.exit(1)
})

var cors = {origin: '*'}
app.socket = new Server(
  httpServer,{
    cors
  }
)  
.on('connect',(cli) => {
  return handleSocket(
    app,cli
  )
})

 
export default app