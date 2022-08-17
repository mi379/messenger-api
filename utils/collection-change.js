import Message from '../mongoose/models/Message.js'

function parsingCollectionChange(id,socket,chg){
  if(chg.operationType == 'insert'){
    return socket.to(id).emit(
      'new',chg.fullDocument
    )
  }
  if(chg.operationType == 'update'){  
    var [_id,desc] = updateParser(
      chg
    )

    return socket.emit('mod',[
      _id,desc.updatedFields
    ])
  }
}

function watchDbsCollectionChg({socket}){
  Message.watch().on('change',(ch) => {
    return parsingCollectionChange(
      ch.fullDocument?.uniqueId,
      socket,ch
    )
  })
}

function updateParser(param){
  return [
    param.documentKey._id,
    param.updateDescription
  ]
}

export {
  watchDbsCollectionChg
}
