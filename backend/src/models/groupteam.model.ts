import {model, Schema} from 'mongoose';

export interface Team{
  eventname:string,
  teamName: string;
  teammem1:string;
  email1:string;
  teammem2:string;
  email2:string;
  teammem3:string;
  email3:string;
  teammem4:string;
  email4:string;
  teammem5:string;
  email5:string;
  teammem6:string;
  email6:string;
}

export const GroupSchema=new Schema<Team>({
    eventname:{type:String,required:true},
    teamName:{type:String,required:true},
    teammem1:{type:String,required:true},
    email1:{type:String,required:true},
    teammem2:{type:String},
    email2:{type:String},
    teammem3:{type:String},
    email3:{type:String},
    teammem4:{type:String},
    email4:{type:String},
    teammem5:{type:String},
    email5:{type:String},
    teammem6:{type:String},
    email6:{type:String},
},{
  toJSON:{virtuals:true},toObject:{virtuals:true},timestamps:true
})

export const GroupModel=model<Team>('GroupCollections',GroupSchema);

