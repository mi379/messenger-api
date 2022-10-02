import mongoose from 'mongoose'
import getRecentlyMessage from '../mongoose/aggregates/getRecentlyMessage.js'
import Message from '../mongoose/models/Message.js'


export default async function(req,res,next){
  var credentials = Object.keys(req.query)
  var [sender,acceptBy] = credentials.map(
    key => mongoose.Types.ObjectId(
      req.query[key]
    )
  )


  try{
    var requestParam = [{accept:acceptBy}]
    var result = await Message.aggregate([
      ...getRecentlyMessage([
        {sender:sender},
        ...requestParam
      ])
    ])

    res.status(200).send(
      result
    )
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }
}