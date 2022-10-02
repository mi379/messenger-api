export default function(params){
  return [
  	{$match:{
      ...params
  	}},
  	{$project:{
  	  username:0,
  	  password:0,
  	  friends:0
  	}}
  ]
}
