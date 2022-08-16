function handleSocket(app,client){
  client.on('join',(roomId) => {
  	console.log(roomId)
    client.join(roomId)
  })
}

export {
  handleSocket
}