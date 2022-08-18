import app from '../bin/www.js'
import mongoose from 'mongoose'


export default (() => {
  mongoose.connection.on(
    'connected',onConnected
  )

  mongoose.connection.on(
    'disconnected',onDiscon
  )
})()

function onConnected(){
  console.log('connected')
  app.set('connected',true)
}

function onDiscon(){
  console.log('disconnected')
  console.log('reconnecting')
  app.set('connected',false)
}
