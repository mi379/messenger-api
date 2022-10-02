import Message from '../mongoose/models/Message.js'

export default async function(req,res){
  try{
  	var send = new Message(req.body)
  	var result = await send.save()

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