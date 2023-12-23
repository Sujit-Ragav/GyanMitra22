import {model,Schema} from "mongoose";


export interface payhash{
    email:string;
    success:string;
    failure:string
}
const payment=new Schema<payhash>({
  email: { type: String , required: true } ,  
  success: { type: String , required: true } , 
  failure: { type: String , required: true }
},{
  timestamps: true,
  toJSON:{
      virtuals: true
  },
  toObject:{
      virtuals: true
  }
})

export const paymentHash=model('paymentHash',payment);
// const payment = new mongoose.Schema( { email: { type: String , required: true } ,  success: { type: String , required: true } , failure: { type: String , required: true } } );
// const paymentHash = mongoose.model('paymentHash',payment);
// module.exports = paymentHash;