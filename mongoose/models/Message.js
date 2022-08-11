import mongoose from 'mongoose'
import Message from '../schemas/Message.js'
export default mongoose.model('Message',Message)