export default function(app,client){
  console.log('socket.io ready')
  client.on('join',(roomId) => {
  	console.log(roomId)
    client.join(roomId)
  })

  client.on('typing',(user) => {
    var [to,from] = parsing(
      user
    )

    app.socket.to(to).emit(
      'type',from
    )
  })

  client.on('typed',(user) => {
  	var [to,from] = parsing(
      user
  	)

  	app.socket.to(to).emit(
      'blur',from
  	)
  })
}

function parsing(param){
  return [
    param.uniqueId,
    param.sender
  ]
}

// export {
//   handleSocket
// }