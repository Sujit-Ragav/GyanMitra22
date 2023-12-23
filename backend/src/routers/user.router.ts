import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router= Router();
import asyncHandler from "express-async-handler";
import { UserModel,User } from "../models/user.model";
import { ProductModel } from "../models/product.model";

router.post('/search',asyncHandler(async(req,res)=>{
  const {email}=req.body;
  const user=await UserModel.findOne({email:email});
  if(!user){
    res.status(400).send("No match");
  }
  res.send(user);
}))

router.post('/retrieve',asyncHandler(async(req,res)=>{
    const {id,tname}=req.body;
    if(tname==='workshop'){
      const users=await UserModel.find({workshop:id});
      res.send(users);
    }
    if(tname==='event'){
      const eusers=await UserModel.find({event:{'$in':[id]}});
      res.send(eusers);
    }
}))

router.post('/retrieveWName',asyncHandler(async(req,res)=>{
  const {pworkshop}=req.body;
  
  const workshop=await ProductModel.findById(pworkshop);
  // let workshopName;
  if(workshop){
    // console.log(workshop.name);
    
    // workshopName=workshop.name;
    res.send(workshop);
  }
}))

router.post('/retrieveEName',asyncHandler(async(req,res)=>{
  const {pevents}=req.body;
  const eventNames=[];
  const elen=pevents.length;
  for(var i=0;i<elen;i++){
    var event=await ProductModel.findById(pevents[i]);
    if(event){
    eventNames.push(event.name);
    }
  }
 if(eventNames.length){
    res.send({eventsname:eventNames});
 }
}))

router.post('/retrieveall',asyncHandler(async(req,res)=>{
  const {email}=req.body;
  if(email==="pramakarthick@gmail.com"){
      const users=await UserModel.find();
      res.send(users);
  }
  else{
    res.status(400).send("You are not authorized");
  }
 
}))

router.post("/login",asyncHandler(
  async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenResponse(user));
     }
     else{ 
    res.status(400).send("Username or password is not valid");
  }
}))

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, college,phone_number,accomdation,gender,year,department,points} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(400)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      college,
      accomdation,
      year,
      department,
      gender,
      phone_number,
      event:[],
      workshop:"",
      isAdmin: false,
      isPayed:false,
      eventPay:false,
      points:0
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))
const generateTokenResponse=(user:any)=>{
    const token=jwt.sign({
      id: user.id,
      email:user.email,isAdmin: user.isAdmin,isPayed:user.isPayed
    },process.env.JWT_SECRET!,{
      expiresIn:"1h"
    });

    return  {
      id: user.id,
      email: user.email,
      name: user.name,
      college:user.college,
      isAdmin:user.isAdmin,
      isPayed:user.isPayed,
      eventPay:user.eventPay,
      event:user.event,
      gender:user.gender,
      department:user.department,
      year:user.year,
      workshop:user.workshop,
      points:user.points,
      token: token
    };
}


export default router;