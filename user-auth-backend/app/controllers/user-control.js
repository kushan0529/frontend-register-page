import { User } from '../models/user-model.js';
import { UserValidationSchema, userloginValidationSchema } from '../validaters/user-validaters.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Usercntrl = {};
Usercntrl.register=async(req,res)=>{
    const body=req.body
    
    const {error,value}=UserValidationSchema.validate(body,{abortEarly:false})
    if(error){
        return res.status(400).json({error:error.details.map(err=>err.message)})
    }
    try{
        const userAlreadyExist=await User.findOne({email:value.email})
        if(userAlreadyExist){
            return res.status(400).json({error:"user already exist"})
        }
        const user=  new User(value)
        const salt=await bcryptjs.genSalt()
        const hashpassword=await bcryptjs.hash(value.password,salt)
        user.password=hashpassword
        const usercount=await User.countDocuments();
        if(usercount==0){
            user.role="admin"
        }
        await user.save()
        res.json({"user details":user})
        console.log(user)

    } catch(err){
        console.log(err)
        return res.status(400).json({error:err.message})
    }
}

Usercntrl.login=async(req,res)=>{
    const body=req.body;
    const{error,value}=userloginValidationSchema.validate(body,{abortEarly:false})
    if(error){
        return res.status(400).json({error:error.details.map(err=>err.message)})
    }
    try{
        const userexist=await User.findOne({email:value.email})
        if(!userexist){
            return res.status(404).json({error:"user not found"})
        }
        const isPasswordMatch=await bcryptjs.compare(value.password,userexist.password)
        if(!isPasswordMatch){
            return res.status(400).json({error:"wrong password"})
        }
        const tokenData={userId:userexist.id, role:userexist.role}
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token:token})
    } catch(err){
        return res.status(400).json({error:'something went  wrong'},err.message)
    }
}

Usercntrl.account=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select('-password')
        
        if(!user){
            return res.status(404).json({error:"user-Id not found"})
        }
        return res.json(user)
    }
    catch(err){
        return res.json({error:"s w w"})
    }
}

Usercntrl.list=async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
}

Usercntrl.delete=async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    if(id==req.userId){
        return res.status(400).json({error:'admin cannot delete his own account'})
    }
    try{
        const user=await User.findByIdAndDelete(id)
        res.json(user)
    }catch(err){
        console.log(err);
        res.json({error:err.message})
    }
    
    }
export default Usercntrl;