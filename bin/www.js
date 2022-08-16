#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {createServer} from 'http'
import {app} from '../app.js'
import {dbConnect} from '../utils/mongodb_connect.js'
import {Server} from 'socket.io'
import {watchDbCollectionChange} from '../utils/message-stream.js'

var port = '8000' || process.env.port
var origin = 'http://localhost:3000'
var httpServer = createServer(app)

httpServer.listen(port || '10000')

httpServer.on('listening',() => {
  dbConnect('localhost:27017')
  watchDbCollectionChange(app)
})

httpServer.on('error',() => {
  console.log('eror')
})


var cors = {origin :'*'}
app.socket = new Server(
  httpServer,{
  	cors
  }
)  
.on(
  'connect',
  onConnected
)

function onConnected(socket){
  console.log('connected')
  socket.on('join',id => {
    console.log(id)
  	socket.join(id)
  })
}



export default app

