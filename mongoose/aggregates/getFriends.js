/* get friend list, recently message and count for same friend*/

export default function(params){
  return [
    {$match:{
      ...params
    }},
    {$lookup:{
      from:'users',
      localField:'friends',
      foreignField:'_id',
      as:'friends'
    }},
    {$project:{
      friends: {
        username:0,
        password:0,
      }
    }},
    {$unwind:{
      path:'$friends'
    }},
    {$addFields:{
      tmpQueryKey: {
      	$sum: [
          "$queryKey",
          "$friends.queryKey"
      	]
      }
    }},
    {$lookup:{
      from:'messages',
      localField:'tmpQueryKey',
      foreignField:'groupId',
      as:'friends.recentlyMessage'
    }},
    {$addFields:{
      friends:{
      	recentlyMessage: {
      	  $max: '$friends.recentlyMessage'
      	}
      }
    }},
    {$lookup:{
      from:'users',
      localField:'friends.friends',
      foreignField:"_id",
      as:'friends.friends'
    }},
    {$project:{
      friends: {
      	friends: {
      	  friends:0,
      	  username:0,
      	  password:0,
      	  queryKey:0
      	}
      }
    }},
    {$group:{
      _id:{
      	_id:'$_id'
      },
      friends: {
      	$push:'$friends'
      }
    }},
    {$addFields:{
      friends: {
        compare:'$friends'
      }
    }},
    {$unwind:{
      path:'$friends'
    }},
    {$addFields:{
      friends:{
      	sameFriends:{
      	  $map:{
      	  	input:'$friends.friends',
      	  	as:'less',
            in:{
              $filter:{
              	input:'$friends.compare',
              	as:'more',
              	cond:{
              	  $eq:[
                    '$$more._id',
                    '$$less._id'
              	  ]
                }
              }
            }
      	  }
      	}
      }
    }},
    {$addFields:{
      friends: {
      	sameFriends: {
      	  $filter: {
      	  	input: '$friends.sameFriends',
      	  	as:'params',
      	  	cond:{
      	  	  $gte:[
      	  	    {
      	  	      $size:'$$params'
      	  	    },
      	  	    1
      	  	  ]
      	  	}
      	  }
      	}
      }
    }},
    {$addFields:{
      friends:{
      	sameFriends:{
      	  $size:'$friends.sameFriends'
      	}
      }
    }},
    {$project:{
      friends:{
      	compare:0,
      	friends:0
      }
    }},
    {$replaceRoot:{
      newRoot:'$friends'
    }}
  ]
}