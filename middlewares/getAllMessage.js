import Message from '../mongoose/models/Message.js'
import getAllMessage from '../mongoose/aggregates/getAllMessage.js'

export default async function(req,res,next){
  var credentials = Object.keys(req.query)
  var queryKeys = credentials.map(key => {
    return parseInt(req.query[key])
  })



  var group = queryKeys.reduce((pv,n) => {
    return pv + n
  })

  try{
    var result = await Message.aggregate([
      ...getAllMessage({
        groupId:group
      })
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