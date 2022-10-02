import schema from '../schemas/message.js'
import mongoose from 'mongoose'

export default mongoose.model(
  'Message',schema
)

