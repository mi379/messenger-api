import search from '../mongoose/aggregates/search.js'
import User from '../mongoose/models/User.js'

export default async function (req,res,next){
  var entries = Object.entries(req.query)

  var [[,userQueryKey]] = entries.filter(
    ([key]) => key == 'queryKey'
  )

  var [[,searchKeyword]] = entries.filter(
    ([key]) => key != 'queryKey'
  )

  var searchParam = Object.fromEntries([
    ['profile.firstName',searchQuery],
    ['profile.lastName',searchQuery],
  ])

  var matchedSearchKey = Object.keys(
    searchParam
  )

  var matched = matchedSearchKey.map(
    key => Object.fromEntries([[
      key,new RegExp(searchParam[
          key
        ]
      )
    ]])
  )
  
  
  
  try{
    var Res  = await User.aggregate([
      ...search(
        matched,
        userQueryKey
      )
    ])

    res.status(200).send(
      Res
    )
  }
  catch(err){
    res.status(500).send(
      err.message
    )
  }

  // var searchParam = Object.fromEntries(
  //   filteredEntries
  // )
  
  // var [[,queryKey]] = entries.filter(
  //   (x,index) => index > 0
  // )

  // try{
  //   var result = await User.aggregate([
  //     ...search(params,qKey)
  //   ])

  //   console.log(
  //     result
  //   )
  // }
  // catch(err){
  //   console.log(
  //     err
  //   )
  // }
}