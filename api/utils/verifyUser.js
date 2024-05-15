import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken= (req,res, next)=> {
    const token = req.cookies.access_token;
   // console.log(req.cookies.access_token);
    //console.log(token);

    if(!token) return next(errorHandler(401,'unauthorized'));
  //  console.log("eoifjkefeu611986")

    jwt.verify(token, "eoifjkefeu611986", (err, user)=>{
        if (err)return next(errorHandler(403,'forbbiden'));

        req.user= user
        next();
    })
}