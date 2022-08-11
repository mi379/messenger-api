import mongoose from 'mongoose'

var username = {
  type: String
}

var password = {
  type: String
}

var profile = {
  type: mongoose.ObjectId
}

export default new mongoose.Schema({
  username,password,profile
})