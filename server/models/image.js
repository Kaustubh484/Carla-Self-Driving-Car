const mongoose =require(`mongoose`);
let imageSchema= new mongoose.Schema({
    filename:{
      type:String,
      required:true  
    },
    fileid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    originalname:{
      type:String,
      required:true
    }
})
const Image=new mongoose.model(`image`,imageSchema);
module.exports=Image;