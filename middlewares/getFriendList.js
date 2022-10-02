import mongoose from 'mongoose'
import getFriends from '../mongoose/aggregates/getFriends.js'
import User from '../mongoose/models/User.js'

export default async function(req,res,next){
  var credential = Object.keys(req.query)
  var [__id] = credential.map(objKey => {
    return mongoose.Types.ObjectId(
      req.query[objKey]
    )
  })


  try{
  	var result = await User.aggregate([
      ...getFriends({
      	_id:__id
      })
  	])		

  	res.status(200).send(
      result
  	)
  }
  catch(err){
  	console.log(
      err
  	)
  }
}