import Message from '../mongoose/models/Message.js'

function parseMessageChange(socket,chg,id){
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

function watchDbCollectionChange({socket}){
  Message.watch().on('change',(chg) => {
    var x = chg.fullDocument?.uniqueId
    parseMessageChange(socket,chg,x)
  })
}

function updateParser(param){
  return [
    param.documentKey._id,
    param.updateDescription
  ]
}

export {
  watchDbCollectionChange
}
