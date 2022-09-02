import Message from '../mongoose/models/Message.js'

function DatabaseCollectionChangeParser(id,socket,info){
  if(info.operationType == 'insert'){
  	return socket.to(id).emit(
      'insert',
      info.fullDocument
  	)
  }

  if(info.operationType == 'update'){
  	return socket.emit('update',[
      ...onDocumentUpdate(
      	info
      )
    ])
  }
}

export default function onCollectionChange(socket){
  Message.watch().on('change',(changeInfo) => {
    return DatabaseCollectionChangeParser(
      changeInfo.fullDocument?.uniqueId,
      socket,changeInfo
    )
  })
}

function documentUpdateParser(key,desc){
  return [key._id,desc.updatedFields]
}

function onDocumentUpdate(info){
  return documentUpdateParser(
    info.documentKey,
    info.updateDescription
  )
}

