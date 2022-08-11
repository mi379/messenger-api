export default function(req,res,next){
  if(req.app.get('connected')){
  	next()
  }
  else{
  	res.status(500).send(
      'network error'
  	)
  }
}
