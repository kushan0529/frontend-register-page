// require('dotenv').config(); // npm install dotenv

// const express =require('express'); // npm install express

// const configureDB =require('./config/db')

// const morgan = require('morgan'); // npm install morgan

// const fs = require('fs');

// const path = require('path');

// const usersCltr = require('./app/controlers/user-controler')

// const app = express();

// const port =process.env.PORT || 5000

// app.use(express.json());

// app.use(morgan('tiny'));

// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }));

// configureDB();


// app.post('/api/users/register',usersCltr.register);
// app.post('/api/users/login',usersCltr.login)


// app.listen(port,()=>{
//     console.log(`ems server is running on port ${port}`);
// });

const User= require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {userLoginValidationSchema,userRegisterValidationSchema}=require('../validators/user-validator');
const morgon =  require('morgan');

const usersCltr={};
usersCltr.register = async(req,res)=>{
    const body=req.body;
    const {error,value}=userRegisterValidationSchema.validate(body,{abortEarly:false});

    if(error){
        return res.status(400).json({error:error.details.map(err=>err.message)});
    }
    try{
        const userPresentWithEmail=await User.findOne({email:value.email});
        if(userPresentWithEmail){
            return res.status(400).json({error:'email already taken'});
    }else{
        const user=new User(value);
        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(value.password, salt);
        user.password = hashPassword;
        await user.save();
        res.status(201).json(user);
    }
}catch(err){
    console.log(err);
    res.status(500).json({error:'something went wrong!!!'});
    }
}

usersCltr.login = async (req,res)=>{
    const body = req.body;
    const {error,value} = userLoginValidationSchema.validate(body,{abortEarly:false});
    if(error){
        return res.status(400).json({error:error.details.map(err => err.message)});
    }
    const userPresent = await User.findOne({ email:value.email});
    if(!userPresent){
        return res.status(400).json({error:'invalid email'});
    }
    const isPasswordMatch = await bcryptjs.compare(value.password,userPresent.password);
    
    if(!isPasswordMatch){
        return res.status(400).json({error:'invalid password'})
    }
    // generate a jwt & sent jwt
    const tokenData = { userId: userPresent._id }
    const token = jwt.sign(tokenData,process.env.JWS_PASSWORD, { expiresIn : "7d"});
    res.json({token:token});
}
module.exports = usersCltr;