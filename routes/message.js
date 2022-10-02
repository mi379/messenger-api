import getRecently from '../middlewares/getRecentlyMessage.js'
import getAll from '../middlewares/getAllMessage.js'
import sendNew from '../middlewares/sendMessage.js'
import express from 'express'


var router = express.Router()

export default router
  .post(
    '/new',
    sendNew
  )
  .get(
    '/recently',
    getRecently
  )
  .get(
    '/all',
    getAll
  )
  







