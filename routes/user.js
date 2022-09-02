import userRouter from '../utils/router.js'
import User from '../mongoose/models/User.js'

userRouter.get('/search',async (req,res) => {
  try{
    var cc = new RegExp(req.query.query)
  	var result = await User.aggregate([{
      $lookup : {
      	from: 'profiles',
      	localField: 'profile',
      	foreignField: '_id',
      	as: 'profile'
      }
  	}])
  	.unwind({
  	  path: '$profile'
  	})
  	.match({
      'profile.firstName': cc
    })
  	.project({
  	  username: 0,
  	  password: 0,
  	  profile : {
  	  	_id: 0
  	  }
  	})

    res.status(200).send(
      result
    )
  }
  catch(err){
  	res.status(500).send(
      err.message
  	)
  }
})


export default userRouter