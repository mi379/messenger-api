import objectId from '../utils/objectId.js'
import messageRouter from '../utils/router.js'
import Message from '../mongoose/models/Message.js'

messageRouter.get('/all',async(req,res) => {
  try{
    var ids = Object.keys(req.query).map(
      (key) => objectId(req.query[key])
    )

    var accept = { $in :ids.reverse() }
    var mch = {sender:{$in:ids},accept}
    var _res = await Message.aggregate(
      [{$match:mch}]
    )
    .project({
      uniqueId: 0,
      __v: 0
    })

    res.status(200).send(
      _res
    )
  }
  catch(error){
    res.status(500).send(
      error.message
    )
  }
})

messageRouter.get('/last',async(req,res) => {
  try{
    var sender = objectId(req.query._id)
    var accept = objectId(req.query._id)
    var usersQuery = [{sender},{accept}]
    var _documentsRoot = {$max:'$$ROOT'}
    var __res = await Message.aggregate(
      [{$match:{$or:usersQuery}}]
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
      _documentsRoot
    })
    .replaceRoot(
      "$_documentsRoot"
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
      __res
    )
  }
  catch(error){
    res.status(500).send(
      err.message
    )
  }
})

export default messageRouter
