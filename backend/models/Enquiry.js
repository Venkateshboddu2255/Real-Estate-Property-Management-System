const mongoose=require("mongoose");
const schema=new mongoose.Schema({property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},name:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true},phone:{type:String,required:true},message:{type:String,required:true},status:{type:String,enum:["New","Contacted","Closed"],default:"New"}},{timestamps:true});
module.exports=mongoose.model("Enquiry",schema);
