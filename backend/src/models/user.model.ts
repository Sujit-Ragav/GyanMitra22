import { model, Schema } from "mongoose";

export interface User{
  id:string;
  name:string;
  college:string;
  phone_number:string;
  email:string;
  password:string;
  isAdmin:boolean;
  isPayed:boolean;
  eventPay:boolean;
  event:string[];
  workshop:string;
  accomdation:string;
  gender:string;
  department:string;
  year:string;
  points:number;
}

export const UserSchema=new Schema<User>({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  college:{type:String,required:true},
  phone_number:{type:String,required:true},
  password:{type:String,required:true},
  isAdmin:{type:Boolean,required:true},
  isPayed:{type:Boolean,required:true},
  event:{type:[String]},
  workshop:{type:String},
  eventPay:{type:Boolean,required:true},
  year:{type:String,required:true},
  gender:{type:String,required:true},
  department:{type:String,required:true},
  accomdation:{type:String,required:true},
  points:{type:Number}
},
{
  toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true
})



export const UserModel=model<User>('UserCollections',UserSchema);