const express = require('express');
const router= express.Router();
const User = require(`../models/user`);
const mongoose=require(`mongoose`);

router.post(`/user/update`,(req,res)=>{
    let requser= req.body.User;
   
    if(requser){
        const newuser= new User({...requser});
        newuser._id=mongoose.mongo.ObjectId(requser._id);
        console.log(newuser);
        User.findOneAndUpdate({_id:mongoose.mongo.ObjectId(requser._id)},newuser,{new:true},(err,user)=>{
            if(err){
                console.log(err);
               return res.status(404).json({msg:"update failed",err:err});
            }
            res.status(200).json({msg:"updated sucessfully",User:user})
        })
    }
})

module.exports=router;