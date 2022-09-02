import mongoose from 'mongoose'


export default async function dbConnect(uri){
  try{
  	await mongoose.connect(
      uri
  	)
  }
  catch(err){
  	errConnDb(err)
  	dbConnect(uri)
  }
}

function errConnDb(err){
  console.log(
    err.message
  )
}
