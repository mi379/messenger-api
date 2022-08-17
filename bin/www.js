#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {createServer} from 'http'
import {app} from '../app.js'
import {dbConnect} from '../utils/mongodb_connect.js'
import {Server} from 'socket.io'
import {watchDbsCollectionChg} from '../utils/collection-change.js'
import {handleSocket} from '../utils/handle-socket.js'


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