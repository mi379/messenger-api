import indexRouter from '../utils/router.js'

indexRouter.get('/',function(req,res,next) {
  res.status(200).send('...')
})

export default indexRouter
