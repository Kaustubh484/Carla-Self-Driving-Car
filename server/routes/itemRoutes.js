const express= require(`express`);
const router= express.Router();
const mongoose =require('mongoose');
const Item= require(`../models/Items`);


router.get(`/items`,async(req,res)=>{
  try{
  const items= await Item.find({});
  res.json(items);
  }catch(err){
      console.log(err);
  }
})

router.get(`/items/:id`,async(req,res)=>{
  try{
  const item= await Item.findOne({_id:req.params.id});
  res.json(item);
  }catch(err){
      console.log(err);
  }
})


router.post(`/items/add`,async(req,res)=>{
   const newitem =new Item({
       name:req.body.name,
       price:req.body.price
   })
   try{
   const item= await newitem.save();
   res.json(item);
   }catch(err){
       console.log(err);
   }
})

module.exports= router;