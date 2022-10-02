import mongoose from 'mongoose'

export default new mongoose.Schema({
  username : {
  	type: String,
  	required: true
  },
  password : {
  	type: String,
  	required: true
  },
  profile: {
  	type: Object,
  	required:true
  },
  friends: {
  	type: Array
  },
  queryKey: {
  	type: Number,
  	required: true
  }
})