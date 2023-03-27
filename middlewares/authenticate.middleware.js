const jwt=require("jsonwebtoken");

const authenticator=(req,res,next)=>{
 const token=req.headers.authorization;
 if(token){
  var decoded = jwt.verify(token, 'masai');
  if(decoded){
   req.body.userID=decoded.userID;
   next()
  }else{
   res.send({"msg":"Please login first"});
  }
 }else{
  res.send({"msg":"Please login first"});
 }
}

module.exports={
 authenticator
}