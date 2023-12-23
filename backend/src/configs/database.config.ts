import { connect,ConnectOptions, set } from "mongoose";

export const dbConnect =()=>{
  connect(process.env.LOCAL_DB_CON!,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  } as ConnectOptions).then(
    ()=>console.log("connected successful"),
    (error)=>console.log(error)
  )
}