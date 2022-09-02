import mongoose from 'mongoose'

export default function connectionEventHandle(app){
  mongoose.connection.on('disconnected',() => {
    app.set('connected',false)

    return console.log(
      '[mongodb]',
      'disconnected'
    )
  })

  mongoose.connection.on('connected',() => {
    app.set('connected',true)

    return console.log(
      '[mongodb]',
      'connected'
    )
  })
}
