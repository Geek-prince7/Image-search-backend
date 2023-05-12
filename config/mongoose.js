const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/image-search')
.then(()=>console.log('connected to mongodb'))
.catch((error)=>console.log(`error in connecting to mongdb ${error}`))
const db=mongoose.connection
module.exports=db