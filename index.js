const express=require('express')
const mongoose=require('./config/mongoose')
const session=require('express-session')
const passport=require('passport')
const cors=require('cors')

const jwtStrategy=require('./config/passport_jwt')
// const passport_jw
const PORT=5000
const app=express()
app.use(cors({
    origin:'*'
}))
app.use(express.urlencoded())
app.use(session({
    name:'search11',//key of cookie
    secret:'search11', // secret key
    saveUninitialized:false,
    resave:false,
    
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/',express.static('uploads'))
app.use('/',require('./route/index'))
app.listen(PORT,(error)=>{
    if(error){
        console.log(`error while firing server`)
        return
    }
    console.log(`server is up on port ${PORT}`)
})