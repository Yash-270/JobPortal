require("dotenv").config();
const jwt=require("jsonwebtoken");
const jwtAutMidd=(req, res, next) =>{
    //first check reqq header has authorixata
    const auth=req.headers.authorization
    if(!auth) return res.status(401).json({error: 'Token Not Found'});
    const token=req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
        const deco=jwt.verify(token,process.env.JWT_SECRET);
        req.user = deco
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token'});
    }
}
const generateToken = (userData) => {
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: 300000});
}
module.exports = {jwtAutMidd, generateToken}
