import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next) => {
    try{
        var token = req.header("authorization");
        console.log("token",toke)
        let jwtSecretKey = 'key';
        if(!token){
            return res.send({status:200,message:"tokennotfound",})
        }
    
    const decode = jwt.verify(token,jwtSecretKey);
    req.result = decode;
    next();
    }catch(e){
        throw e
    }
}