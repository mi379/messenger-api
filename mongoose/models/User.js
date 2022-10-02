import schema from '../schemas/user.js'
import mongoose from 'mongoose'

export default mongoose.model(
  'User',schema
)

