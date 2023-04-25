import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { SECRET_KEY } from "../../../core/constant.mjs";
import { generateUUID } from "../../../core/utils.mjs";
import { db } from "../../../database/connection.mjs";
import { addUserQuery, getProfileQuery, loginQuery, updateUserImageQuery, validateEmailQuery } from "../../../database/v1.admin.query.mjs";
import { sendMail } from "../mail/mail.service.mjs";

const saltRounds = 10;

export const signUp = (req,res)=>{
    const {
        username,
        fullname,
        email,
        phone_number
    } = req.body;

    const uuid = generateUUID();

    db.query(addUserQuery,[fullname,username,req.hashPassword,'user',email,phone_number,uuid])
    .then(result=>{
        sendMail(email,'Bootcamp channel verification',`
            <h2>Hello ${fullname}</h2>
            <p>Thanks for your registartion.</p>
            <h5>You can activate your account by clicking this link: </h5>
            <a href="http://192.168.1.9:7867/api/v1/auth/verify-email/${uuid}">Click to activate</a>
        `,(r)=>{
            res.json(resGenerator(result.rows[0]));
        })
        
    })
    .catch(err=>{
        badRequest(res);
    })

}

export const hashPassword=(req,res,next)=>{
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.hashPassword = hash;
            next();
        });
    });
}

export const verifyEmail = (req, res) => {
    db.query(validateEmailQuery,[req.params.key])
    .then(result=>{
        if(result.rows.length>0){
            res.send(`<center><h2>Hello ${result.rows[0].fullname}.<br/> Your Account activated</h2></center>`)
        } else {
            res.send(`<center><h2 style="color:red;">Validation key is not valid</h2></center>`);
        }
    })
    .catch(err=>{
        res.send(`<center><h2 style="color:red;">${err}</h2></center>`);
    })
}

export function login(req,res){
    const {
        username, password
    } = req.body;
    console.log(req.body);
    db.query(loginQuery,[username])
    .then(result=>{
        if(result.rows.length>0){
            bcrypt.compare(password, result.rows[0].password, function(err, match) {
                if(match){
                    let data = result.rows[0];
                    data.password = '';
                    let token = jwt.sign(data,SECRET_KEY);
                    
                    res.json(resGenerator({
                        ...data,
                        token
                    }))
                } else {
                    res.status(401).json({error:true,mesage:'Passwords do not match'});
                }
            });
        } else {
            res.status(403).json({error:true,mesage:'Forbidden'});
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/user-image')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'-'+file.originalname);
  }
})

export const uploadUserImage = multer({ storage: storage })

export function updateUserImage(req,res){
    let image = req.file.filename;
    const id = req.user.id;

    db.query(updateUserImageQuery,[image,id])
    .then(result=>{
        if(result.rows.length>0){
            res.json(resGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function getProfile(req, res){
    const id = req.user.id;

    db.query(getProfileQuery,[id])
    .then(result=>{
        if(result.rows.length){
            res.json(resGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}