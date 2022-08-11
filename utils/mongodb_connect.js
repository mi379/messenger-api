import app from '../bin/www.js'
import mongoose from 'mongoose'

mongoose.connection.on(
  'connected',function(){
  	console.log('connected')
  	app.set('connected',true)
  }
)

mongoose.connection.on(
  'disconnected',function(){
  	console.log('disconnected')
  	console.log('reconnecting')
  	app.set('connected',false)
  }
)

function errConnDb(err){
  console.log(err.message)
}


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

export {
  dbConnect
}
