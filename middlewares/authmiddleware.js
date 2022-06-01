const jwt = require('jsonwebtoken');
const taskModel =  require('../models/taskModels');
const config = require("../utils/config");

const requireAuth = (req,res,next) => {
    try{
        const token = req.cookies.JWT;
        //console.log('inside verifying token');
        jwt.verify(token,config.secret,(err,decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                next();
            }
        })
        } catch(err){
        return res.redirect('/login');
         }
    }

    const logout = (req,res,next) => {
        res.cookie('JWT','',{maxAge:1});
        res.redirect('/login');
    }

module.exports = {requireAuth,logout};