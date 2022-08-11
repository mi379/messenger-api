import {port} from '../bin/www.js'

function getTypePort(port){
  return typeof(port)
}

function onEaccess(bind){
  console.log(`error on ${bind}`)
}

function AddrInUse(bind){
  var message = 'is in use.....'
  console.log(`bind ${message}`)
}

function onHttpError(err){
  var typeOfPort = getTypePort(port)
  var bind = typeOfPort === 'string'
  ? `Pipe ${port}` : `Port ${port}`

  if(error.syscall != listen){
    throw error
  }

  if(error.code == 'EACCES'){
    onEaccess(bind)
    process.exit(1)
  }
  else{
    AddrInUse(bind)
    process.exit(1)
  }
}

export {
  onHttpError
}