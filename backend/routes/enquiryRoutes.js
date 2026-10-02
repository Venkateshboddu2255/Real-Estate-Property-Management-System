const express=require("express"); const Enquiry=require("../models/Enquiry"); const router=express.Router();
router.post("/",async(req,res)=>{try{res.status(201).json(await Enquiry.create(req.body))}catch(e){res.status(400).json({message:e.message})}});
router.get("/",async(req,res)=>{try{const enquiries=await Enquiry.find().populate("property","title location price").sort({createdAt:-1});res.json({count:enquiries.length,enquiries})}catch(e){res.status(500).json({message:e.message})}});
router.get("/:id",async(req,res)=>{try{const x=await Enquiry.findById(req.params.id).populate("property","title location price");if(!x)return res.status(404).json({message:"Enquiry not found"});res.json(x)}catch(e){res.status(500).json({message:e.message})}});
router.patch("/:id/status",async(req,res)=>{try{const x=await Enquiry.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true,runValidators:true});res.json(x)}catch(e){res.status(400).json({message:e.message})}});
router.delete("/:id",async(req,res)=>{await Enquiry.findByIdAndDelete(req.params.id);res.json({message:"Enquiry deleted"})}); module.exports=router;
