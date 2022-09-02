import fn from './onCollectionChange.js'

export default function(socket){
  socket.on(
  	'connect',
  	onConnected
  )

  return fn(
    socket
  )
}

function onConnected(client){
  console.log('[socket] connected')
  client.on('join',id => {
  	return client.join(
      id
  	)
  }) 
}