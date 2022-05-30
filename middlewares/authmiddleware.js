const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    try{
        const token = req.cookies.JWT;
       // next();
        //console.log(token)
        //const {correo,contraseña} =;
        console.log(req.body);
        jwt.verify(token,'123456',(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                //console.log(decodedToken);
                next();
            }
        })
        } catch(err){
        return res.redirect('/login');
         }
    }

module.exports = {requireAuth};