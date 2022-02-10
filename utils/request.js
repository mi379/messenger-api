var axios = require('axios');

module.exports = ({URL}) => {
  return {
    config : (method,path,requestData) => {
      return new Promise(async(resolve,reject) => {
     	try{
     	  var {data} = await axios({
     	  	method : method,
     	  	url : `${URL}/${path}`,
     	  	data : requestData
     	  })
        resolve(data)
     	}
     	catch(err){
     	  reject(err)
     	}
      })
    }
  }
}