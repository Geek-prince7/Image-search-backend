const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const IMAGE_PATH=path.join('/posts')

const PostSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../','/uploads',IMAGE_PATH))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+req.user.id+'-'+Date.now()+'.png')
    }
})

PostSchema.statics.uploadedImg=multer({storage:storage}).single('image')
PostSchema.statics.IMAGE_PATH=IMAGE_PATH
const Post=mongoose.model('posts',PostSchema)
module.exports=Post