var axios = require('axios');

module.exports = ({URL}) => {
 return Object({config : (method,path,data) => {
 	return new Promise(async(resolve,reject) => {
 	  try{
 	  	var result = await axios({
 	  	  method : method,method,
 	  	  url : `${URL}/${path}`,
 	  	  data : data
 	  	})
 	  	resolve(result)
 	  }
 	  catch(err){
 	  	reject(
          err
 	    )
 	  }
 	})
 }})
}