import getUser from '../mongoose/aggregates/getUser.js'
import User from '../mongoose/models/User.js'

export default async function(req,res,next){
  try{
  	var [result] = await User.aggregate([
      ...getUser(req.body)
  	])

  	if(result){
  	  res.status(200).send(
        result
  	  )
  	}
  	else{
  	  throw Error(
        'user not found'
  	  )
  	}
  }
  catch(err){
  	res.status(500).send(
      err.message
  	)
  }
}


