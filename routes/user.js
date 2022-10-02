import getFriendList from '../middlewares/getFriendList.js'
import search from '../middlewares/search.js'
import auth from '../middlewares/authUser.js'


import express from 'express'

var router = express.Router()

export default router
  .post(
    '/auth',
    auth
  )
  .get(
    '/friends',
    getFriendList
  )
  .get(
    '/search',
    search
  )
