var axios = require('axios');

module.exports = (url) => {
  return {
    config : (method,path,requestData) => {
      return new Promise(async(resolve,reject) => {
     	  try{
     	    var {data} = await axios({
     	  	  method : method,
     	  	  url : `${url}/${path}`,
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