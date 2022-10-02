import mongoose from 'mongoose'

export default new mongoose.Schema({
  sender: {
    type: mongoose.ObjectId,
    required:true
  },
  accept: {
    type: mongoose.ObjectId,
    required:true
  },
  content: {
    type: Object,
    required:true
  },
  groupId: {
    type: Number,
    required:true
  }
})

