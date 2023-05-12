const passport=require('passport')
const jwtStrategy=require('passport-jwt').Strategy
const extractJwt=require('passport-jwt').ExtractJwt

const User=require('../models/user')

let opts={
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'hello123'
}

passport.use(new jwtStrategy(opts,async(jwt_payload,done)=>{
    try {
        let user=await User.findOne({email:jwt_payload.sub})
        if(user)
        {
            return done(null,user)
        }
        return done(null,false)
        
    } catch (error) {
        console.log('error in finding user ',error)
        return done(null)
        
    }
    
        
    
}))

module.exports=passport