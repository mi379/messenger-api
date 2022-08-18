import mongoose from 'mongoose'


export default function(req, res, next){
  req.app.set('Id',mongoose.Types.ObjectId)
  return next()
}