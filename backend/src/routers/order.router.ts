import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middleware/auth.mid';
import { UserModel } from '../models/user.model';
import { GroupModel } from '../models/groupteam.model';
import { paymentHash } from '../models/payment.model';


const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(400).send('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)

router.post('/retrieve',asyncHandler(async(req,res)=>{
      const ename=req.body.name;
      var paylist=[];
   // console.log(req);
      const teams=await GroupModel.find({eventname:ename});
      var team_len=teams.length;
      for(var i=0;i<team_len;i++){
        if(teams[i].email1){
            const user=await UserModel.findOne({email:teams[i].email1});
            if(user){
                paylist.push(user);
            }
        }
        if(teams[i].email2){
            const user=await UserModel.findOne({email:teams[i].email2});
            if(user){
                paylist.push(user);
            }
        }
        if(teams[i].email3){
            const user=await UserModel.findOne({email:teams[i].email3});
            if(user){
                paylist.push(user);
            }
        }
        if(teams[i].email4){
            const user=await UserModel.findOne({email:teams[i].email4});
            if(user){
                paylist.push(user);
            }
        }
        if(teams[i].email5){
            const user=await UserModel.findOne({email:teams[i].email5});
            if(user){
                paylist.push(user);
            }
        }
        if(teams[i].email6){
            const user=await UserModel.findOne({email:teams[i].email6});
            if(user){
                paylist.push(user);
            }
        }

      }

      res.send({team:teams,paylists:paylist});

}))


router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
    const order= await getNewOrderForCurrentUser(req);
    if(order){ 
    res.send(order);
    }
    else{
    res.status(400).send();
    }
}))



router.post('/registerEvent',asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
   // const group=await getGroup(req);
    
    const user =await getCurrentUser(req) ;
    if(!user){
        res.status(400).send('User Not Found!');
        return;
    }
	if(requestOrder.tname=="workshop"){
		if(user.workshop){
			res.json({msg:-1});
			return;
		}
	  else{
	  user.workshop=requestOrder._id;

	  }
	}
    else{
    if(user.event){
        let productItem=user.event.find(prod=>prod===requestOrder._id);
        if(productItem){
            res.json({msg:-1});
            return
        }
        let eventsArray=user.event;
        eventsArray.push(requestOrder._id);
        user.event=eventsArray;
        
    }
    }
	await user.save();
    res.send(user);
    
})
)

function getHash ( timestamp:any, status:any , amount:any , payload:any , reverse:any ) {
  let sha512 = require ( "crypto" ).createHash ( "sha512" )
  let formulatedString = process.env.MERCHANT_KEY + "|"  + (payload.email + timestamp) + "|" + amount + "|gyanmitraentry|" + payload.name + "|" + payload.email + "|||||||||||" + process.env.SALT
  if ( reverse ) {
     formulatedString = process.env.SALT + "|" + status + "|||||||||||" + payload.email + "|" + payload.name + "|gyanmitraentry|" + amount + ".00|" + ( payload.email + timestamp ) + "|" + process.env.MERCHANT_KEY
   }
   sha512.update ( formulatedString )
   return reverse ? sha512.digest ( ).toString ( "hex" ) : { time: timestamp , digest: sha512.digest ( ).toString ( "hex" ) }
}

router.post('/eventpay', asyncHandler( async (req:any, res) => {

    const user =await getCurrentUser(req) ;
	//console.log(req);
    
    if(!user){
      res.status(400).send('User Not Found!');
      return;
    }

  //  let totprice=200+(0.04*200);
    let timestamp = new Date().getTime() 
   let result = getHash ( timestamp , "" ,1,user , false )
   console.log ( "result: " , result )
   paymentHash.create ( { email: user.email , failure: getHash ( timestamp , "failure" ,1,user , true )  , success: getHash ( timestamp , "success" , 1 , user, true )})
   res.send ({ payurl: 'https://secure.payu.in/_payment' , data: { key: process.env.MERCHANT_KEY , txnid: ( user.email + result [ "time" ] ), amount: 1 , productinfo: "gyanmitraentry" , firstname: user.name , email: user.email , phone: user.phone_number , surl: "https://localhost:4200/payeventstatus" , furl: "https://localhost:4200/payeventstatus" , hash: result [ "digest" ] } } )
      
		
}))

router.post('/pay', asyncHandler( async (req:any, res) => {


    const user =await getCurrentUser(req) ;
	
    
    if(!user){
      res.status(400).send('User Not Found!');
      return;
    }

	let totprice=req.body.price+(0.04*req.body.price);
    let timestamp = new Date().getTime() 
   let result = getHash ( timestamp , "" ,2,user , false )

   paymentHash.create ( { email: user.email , failure: getHash ( timestamp , "failure" ,2,user , true )  , success: getHash ( timestamp , "success" , 2, user, true )})
   res.send({ payurl: 'https://secure.payu.in/_payment' , data: { key: process.env.MERCHANT_KEY , txnid: ( user.email + result [ "time" ] ), amount: 2, productinfo: "gyanmitraentry" , firstname: user.name , email: user.email , phone: user.phone_number , surl: "https://localhost:4200/paystatus" , furl: "https://localhost:4200/paystatus" , hash: result [ "digest" ] } } )
      
 
    
}))



export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

async function getCurrentUser(req:any) {
  return await UserModel.findOne({user:req.user.id,email:req.user.email});
}

async function getGroup(req:any){
    return await GroupModel.find({email1:req.user.email});
}