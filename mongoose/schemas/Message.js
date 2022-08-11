import mongoose from 'mongoose'

var _id = {
  type: mongoose.ObjectId
}

var sender = {
  type: mongoose.ObjectId
}

var receiver = {
  type: mongoose.ObjectId
}

var content = {
  type: Object
}

var uniqueId = {
  type: String
}

var read = {
  type: Boolean
}

export default new mongoose.Schema({
  _id,sender,receiver,
  content,uniqueId,read
})