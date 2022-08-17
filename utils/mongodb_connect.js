import mongoose from 'mongoose'


async function dbConnect(host){
  try{
  	var db = `${host}/rtdb`
  	await mongoose.connect(
      `mongodb://${db}`
  	)
  }
  catch(err){
  	errConnDb(err)
  	dbConnect(host)
  }
}

function errConnDb(err){
  console.log(
    err.message
  )
}


export {
  dbConnect
}
