#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {createServer} from 'http'
import {app} from '../app.js'
import {dbConnect} from '../utils/mongodb_connect.js'
import {onHttpError} from '../utils/http-error.js'
import {Server} from 'socket.io'

var port = '8000' || process.env.port
var origin = 'http://localhost:3000'
var httpServer = createServer(app)

httpServer.listen(port || '10000')
httpServer.on('error',onHttpError)
httpServer.on('listening',(x) => {
  console.log(`port: ${port}`)
  console.log('waiting db...')
  dbConnect('localhost:27017')
})

var cors = {origin}
var io = new Server(
  httpServer,{
  	cors
  }
)
.on(
  'connect',
  onConnected
)

function onConnected(client){
  client.on('join',id => {
    console.log(id)
    client.join(id)
  })
}


export default app

export {
  port
}