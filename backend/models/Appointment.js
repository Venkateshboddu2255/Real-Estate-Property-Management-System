const mongoose=require("mongoose");
const schema=new mongoose.Schema({property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},name:{type:String,required:true,trim:true},email:{type:String,required:true},phone:{type:String,required:true},appointmentDate:{type:Date,required:true},message:{type:String,default:""},status:{type:String,enum:["Pending","Confirmed","Completed","Cancelled"],default:"Pending"}},{timestamps:true});
module.exports=mongoose.model("Appointment",schema);
