import indexRouter from '../utils/router.js'

indexRouter.get('/',(req,res) => {
  res.send('index page...')
})

export default indexRouter
