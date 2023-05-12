const express=require('express')
const router=express.Router()
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const passport=require('passport')
const Post=require('../models/Post')
const path=require('path')
//ping back from server
router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'hello from server now login/signup to continue url - /login   or /user/create'

    })
})


//create a new user
router.post('/user/create',async(req,resp)=>{
    if(!validate(req.body.name) || !validate(req.body.email) || !validate(req.body.password)){
        return resp.status(400).json({
            code:1001,
            message:'bad request/madatory feilds validation failed'

        })
    }
    try {
        let user=await User.create(req.body)
        return resp.status(200).json({
            code:1000,
            message:'added to db',
            data:user
        })
        
    } catch (error) {
        console.log(`error ----------> ${error}`)
        resp.status(500).json({
            code:'1001',
            message:'Internal server error'
        })
        
    }
    
})


//login 
router.post('/login',async(req,resp)=>{
    try {
        let user=await User.findOne({email:req.body.email,password:req.body.password})
        if(user){
            const payload={data:user}
            const options={
                subject:user.email,
                expiresIn:1000*3600
            }
            return resp.status(200).json({
                code:1000,
                message:'login success keep your token',
                data:{
                    token:jwt.sign(payload,'hello123',options)
                }
            })


        }
        return resp.json(422,{
            code:'1001',
            message:'invalid username/password'
            
        })
    } catch (error) {
        console.log(`error ----------> ${error}`)
        resp.status(500).json({
            code:'1001',
            message:'Internal server error'
        })
        
    }


})

//get user details if logged in
router.get('/details',passport.authenticate('jwt',{session:false}),async(req,resp)=>{
    try {
        let user=await User.findById(req.user.id).select('email name')
        if(user)
        {
            return resp.status(200).json({
                code:1000,
                message:'success',
                data:user
            })
        }
        return resp.status(404).json({
            code:1004,
            message:'404 not found'
        })
        
    } catch (error) {
        console.log(`error ----------> ${error}`)
        resp.status(500).json({
            code:'1001',
            message:'Internal server error'
        })
        
        
    }

})


//create a new Post
router.post('/post/create',passport.authenticate('jwt',{session:false}),async(req,resp)=>{
    console.log(req.user)
    try {
        Post.uploadedImg(req,resp,async(error)=>{
            if(error){
                console.log("************* Multer error ***********",error)
            }
            console.log(req.file)
            let image=Post.IMAGE_PATH+'/'+req.file.filename
            let name=req.body.name
            let post=await Post.create({name:name,image:image,user:req.user._id})
            return resp.status(200).json({
                code:1000,
                message:'success',
                data:post
            })
            
        })
        
        
    } catch (error) {
        console.log(`error ----------> ${error}`)
        resp.status(500).json({
            code:'1001',
            message:'Internal server error'
        })
        
    }
})

//search post
router.get('/post/search',passport.authenticate('jwt',{session:false}),async(req,resp)=>{
    const query=req.query.q
    try {
        let posts=await Post.find({name:{$regex:query}})
        resp.status(200).json({
            code:1000,
            message:'success',
            data:posts
        })
        
    } catch (error) {
        console.log(`error ----------> ${error}`)
        resp.status(500).json({
            code:'1001',
            message:'Internal server error'
        })
        
    }
})






//validation
const validate=(feild)=>{
    if(feild==undefined || feild==null || feild==''){
        return false;
    }
    return true;
}
module.exports=router