import jwt from "jsonwebtoken";
import { badRequest } from "../../../core/app.response.mjs";
import { SECRET_KEY } from "../../../core/constant.mjs";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, SECRET_KEY, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function authenticateTokenOptional(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null){
    req.isLogin = false;
     next()
  } else {
    jwt.verify(token, SECRET_KEY, (err, user) => {

    if (err) {
        req.isLogin = false;
    } else {
        req.user = user;
        req.isLogin = true;
    }

    

    next()
  })
  }

  
}

export function checkIsAdmin(req,res,next){
  if(typeof req.user !== 'undefined' && req.user != null){
    if(req.user.user_type==='admin'){
      next();
    } else {
      res.status(403).json({error:true,message:{
        en:'You are not admin'
      }})
    }
  } else {
    badRequest(res);
  }
}
