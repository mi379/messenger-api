import signInRouter from '../utils/router.js'
import User from '../mongoose/models/User.js'

signInRouter.post('/',async(req,res,next) => {
  try{
    var matchQuery = [{$match:req.body}]
    var [result] = await User.aggregate(
      matchQuery
    )
    .lookup({
      from: 'profiles',
      localField: 'profile',
      foreignField: '_id',
      as: 'profile'
    })
    .unwind({
      path:'$profile'
    })
    .project({
      username: 0,
      password: 0,
      profile: {
        _id: 0
      }
    })

    if(result){
      res.status(200).send(
        result
      )
    }
    else{
      throw new Error(
        'user not found'
      )
    }
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }
})


export default signInRouter