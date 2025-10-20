import jwt from "jsonwebtoken"
const check_authentication=(req,res,next)=>{
    const {jwt_part}=req.body
    if(!jwt_part){
        return res.send("Need to login")
    }
    try{
    const jwt_verified=jwt.verify(jwt_part,process.env.JWT_KEY)
    console.log(jwt_verified.email,req.body.email)
    if(jwt_verified.email == req.body.email){
         next()
    }else{
        return res.send("You are not Authenticated")
    }
   
    }catch(error){
        return res.send("You are not Authenticated")

    }
    
}
export default check_authentication