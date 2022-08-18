import mongoose from 'mongoose'
import messageRouter from '../utils/router.js'
import Message from '../mongoose/models/Message.js'
import objectId from '../utils/objectId.js'
import objId from '../middlewares/object-id.js'


messageRouter.get('/last',objId,async(req,res) => {
  try{
    var sender = req.app.get("Id")(req.query._id)
    var accept = req.app.get("Id")(req.query._id)
    var newDocumentRootAsResult = {$max:'$$ROOT'}
    var newQueryResult = await Message.aggregate(
      [{$match:{$or:[{sender},{accept}]}}]
    )
    .lookup({
      from:'users',
      localField:'sender',
      foreignField:'_id',
      as:'sender'
    })
    .lookup({
      from:'users',
      localField:'accept',
      foreignField:'_id',
      as:'accept'
    })
    .unwind({
      path:'$sender'
    })
    .unwind({
      path:'$accept'
    })
    .lookup({
      from:'profiles',
      localField:'sender.profile',
      foreignField:'_id',
      as:'sender.profile'
    })
    .lookup({
      from:'profiles',
      localField:'accept.profile',
      foreignField:'_id',
      as:'accept.profile'
    })
    .unwind({
      path:'$sender.profile'
    })
    .unwind({
      path:'$accept.profile'
    })
    .group({
      _id:'$uniqueId',
      newDocumentRootAsResult
    })
    .replaceRoot(
      "$newDocumentRootAsResult"
    )
    .project({
      sender: {
        username: 0,
        password: 0
      },
      accept: {
        username: 0,
        password: 0
      }
    })


    res.status(200).send(
      newQueryResult
    )
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }
})

messageRouter.get('/all',objId,async(req,res) => {
  try{
    var criteria = Object.keys(req.query).map(
      (x) => req.app.get("Id")(req.query[x])
    )

    var accept = { $in :criteria.reverse() }
    var mch = {sender:{$in:criteria},accept}
    var newResult = await Message.aggregate(
      [{$match:mch}]
    )
    .project({
      uniqueId: 0,
      __v: 0
    })

    res.status(200).send(
      newResult
    )
  }
  catch(error){
    res.status(500).send(
      error.message
    )
  }
})

messageRouter.post('/new',async(req,res) => {
  try{
    var New = new Message(req.body)
    var result = await New.save()

    res.status(200).send(
      'already send'
    )
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }
})



messageRouter.put('/new',async(req,res) => {
  try{
    await Message.findByIdAndUpdate(
      req.body._id,req.body
    )
    
    res.status(200).send(
      'already update'
    )
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }
})

export default messageRouter
