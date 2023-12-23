import { model, Schema } from "mongoose";

export interface Product{
  id:string;
  name:string;
  time:string;
  imageUrl:string;
  rules:string[];
  price:number;
  tname:string;
  group:string;
  venue:string;
  speaker:string[];
  conductedby:string;
  desc:string;
}

export const ProductSchema=new Schema<Product>({
  name:{
    type:String,
    required:true
  },
  time:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  rules:{
    type:[String]
  },
  price:{
    type:Number
  },
  tname:{
    type:String,
    required:true
  },
  group:{
    type:String,
    required:true
  },
  venue:{
    type:String,
    required:true
  },
  speaker:{
    type:[String]
  },
  conductedby:{
    type:String,
    required:true
  },
  desc:{
    type:String
  }
},
{
  toJSON:{
    virtuals:true
  },
  toObject:{
    virtuals:true
  },
  timestamps:true

}
)


export const ProductModel=model<Product>('ProductCollection',ProductSchema);