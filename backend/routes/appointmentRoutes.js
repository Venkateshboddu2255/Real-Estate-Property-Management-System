const express=require("express"); const Appointment=require("../models/Appointment"); const router=express.Router();
router.post("/",async(req,res)=>{try{res.status(201).json(await Appointment.create(req.body))}catch(e){res.status(400).json({message:e.message})}});
router.get("/",async(req,res)=>{try{const appointments=await Appointment.find().populate("property","title location price").sort({appointmentDate:1});res.json({count:appointments.length,appointments})}catch(e){res.status(500).json({message:e.message})}});
router.get("/:id",async(req,res)=>{try{const x=await Appointment.findById(req.params.id).populate("property","title location price");if(!x)return res.status(404).json({message:"Appointment not found"});res.json(x)}catch(e){res.status(500).json({message:e.message})}});
router.patch("/:id/status",async(req,res)=>{try{const x=await Appointment.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true,runValidators:true});res.json(x)}catch(e){res.status(400).json({message:e.message})}});
router.delete("/:id",async(req,res)=>{await Appointment.findByIdAndDelete(req.params.id);res.json({message:"Appointment deleted"})}); module.exports=router;
