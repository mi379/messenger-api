import {Server} from 'socket.io'
import {httpServer} from '../bin/www.js'

var origin = '*'
var cors = {origin}
var io = new Server(
  httpServer
)
.on(
  'connect',
  onConnect
)

function onConnect(client){
  console.log('socket..')
}

export {
  io
}

