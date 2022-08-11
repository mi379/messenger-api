import indexRouter from '../utils/router.js'

indexRouter.get('/',(req,res,next) => {
  res.send('index page...')
})

export default indexRouter
