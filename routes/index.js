import indexRouter from '../utils/router.js'

indexRouter.get('/',function(req,res,next) {
  setTimeout(() => res.send({}),5000)
})

export default indexRouter
