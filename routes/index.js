import express from 'express'

var router = express.Router()

export default router.get(
  '/',(req,res) => {
    res.send(
      '...'
    )
  }
)
