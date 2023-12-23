import express from 'express';
import cors from 'cors';
import path from 'path';
// import  BodyParser from 'body-parser'
import productRouter from "./routers/product.router";
import dotenv from 'dotenv';
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
import groupRouter from './routers/group.router';
import { paymentHash } from './models/payment.model';
import bodyParser from 'body-parser';
import { UserModel } from './models/user.model';
dotenv.config();
dbConnect();
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}));



app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/group",groupRouter);

app.use(express.static('public'));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname ,'public','index.html'))
})

app.post ( "/payeventstatus" , async( req :any, res ) => {
    
  //res.send("Hello world");
  // console.log(req.body);
 
 
   paymentHash.find ( { email: req.body.email } , async( error :any, result:any ) => {
     if ( error )
     {
       console.log ( "error in payment status: finding email hash " , error )
       throw error
     }
     else {
      // console.log(req.body);
      if ( result [ result.length - 1 ] [ req.body.status ] == req.body.hash ) {
          if ( req.body.status == "success" ){
            const user=await UserModel.findOne({email:req.body.email});
            if(!user){
              res.status(400).send('User Not Found!');
              return;
            }
            user.eventPay=true;
            await user.save();
          //  user.isPayed=true;
          //  
          //  await user.save();
          //  // res.send(user);
         
          }
          res.redirect ( "https://gyanmitra23-mepcoeng.onrender.com/paid?status=" + req.body.status );

       }
     
}
})
} )




app.post ( "/paystatus" , async( req :any, res ) => {
    
  // //res.send("Hello world");
  // console.log(req.body);
 
  // const group=await getGroup(req);
  //  const user =await getCurrentUser(req) ;
  //  if(!user){
  //    res.status(400).send('User Not Found!');
  //    return;
  //  }
   paymentHash.find ( { email: req.body.email } , async( error :any, result:any ) => {
     if ( error )
     {
       console.log ( "error in payment status: finding email hash " , error )
       throw error
     }
     else {
      // console.log(req.body);
      if ( result [ result.length - 1 ] [ req.body.status ] == req.body.hash ) {
          if ( req.body.status == "success" ){
            const user=await UserModel.findOne({email:req.body.email});
            if(!user){
              res.status(400).send('User Not Found!');
              return;
            }
            user.isPayed=true;
            await user.save();
          //  user.isPayed=true;
          //  
          //  await user.save();
          //  // res.send(user);
         
          }
          res.redirect ( "https://gyanmitra23-mepcoeng.onrender.com/paid?status=" + req.body.status );

       }
     
}
})
} )

const port=process.env.PORT || 3000;
app.listen(port,()=>{
  console.log("server connected to ",port);
});