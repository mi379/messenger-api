export default function(params){
  return [
    {$match:{
      ...params
    }},
    {$project:{
      groupId:0
    }}
  ]
}