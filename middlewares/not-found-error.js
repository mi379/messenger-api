export default function(req,res,next){
  res.status(404).send(
  	'404:not found'
  )
}