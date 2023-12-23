import { Router } from "express";
const router= Router();
import asyncHandler from "express-async-handler";
import { GroupModel, Team } from "../models/groupteam.model";
import { UserModel } from "../models/user.model";


router.post("/checkRegister",async(req,res)=>{
  const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;
  var arrayUnreg:any[]=[];
  // var i=2;
  var emails=[email2,email3,email4,email5,email6];
  for(var i=0;i<5;i++){
    if(emails[i]){
      let user=await UserModel.findOne({email:emails[i]});
      if(!user){
        arrayUnreg.push(i+2);
      }
    }
  }
  // console.log(arrayUnreg);
  res.send(arrayUnreg);

})

router.post('/create',asyncHandler(
  async(req,res)=>{
   const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;

//    await GroupModel.deleteOne({
//     eventname:eventname,
//     email1: email1,
//     paystatus: false
// });

   const groupTeam:Team={
      eventname,
      teamName,
      teammem1,
      email1,
      teammem2,
      email2,
      teammem3,
      email3,
      teammem4,
      email4,
      teammem5,
      email5,
      teammem6,
      email6
   }

   const newTeam=await GroupModel.create(groupTeam);
    res.send(newTeam);
  }
))






router.post('/register',asyncHandler(async(req,res)=>{
  const {eventname,teamName,teammem1,email1,teammem2,email2,teammem3,email3,teammem4,email4,teammem5,email5,teammem6,email6}=req.body;
  const groupTeam:Team={
    eventname,
    teamName,
    teammem1,
    email1,
    teammem2,
    email2,
    teammem3,
    email3,
    teammem4,
    email4,
    teammem5,
    email5,
    teammem6,
    email6
 }

 const newTeamRegister=await GroupModel.create(groupTeam);
 res.send(newTeamRegister);

}))

export default router;