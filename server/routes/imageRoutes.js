// Contains routes for image processing(upload,delete etc)
const express= require(`express`);
const imageRouter= express.Router();
const mongoose= require(`mongoose`);

const Image= require(`../models/image`);

// exported as a function to accept multer storage variable 'upload' as an arguement
module.exports=(upload)=>{
    const mongooseURI=`mongodb://127.0.0.1:27017/HackSquad`;
    mongoose.connect(mongooseURI, { useNewUrlParser: true });
   db = mongoose.connection;
    let gfs;
    db.once('open', () => {
        //initialising GridFsBucket stream (used for steaming image from database)
        gfs = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "uploads"
        });
        console.log("Connected to Mongo");
    })
    db.on('error', (err) => {
        console.log("Error in connection to Mongo");
    })

    //Upload route
    imageRouter.post('/upload/image/:userid',upload.single('pic'),(req,res)=>{
        //Check if image with the original filename already exists
       Image.findOne({originalname:req.file.originalname}).then((image)=>{
           if(image){
              return   res.status(404).json({
                   success:false,
                   msg:`image with this name already exists`
               })
               
           }
       })
       //Covert userid from parameters(which is a string) to type of ObjectId
    const uid=mongoose.mongo.ObjectId(req.params.userid);
    console.log(req.file);
       let newImage= new Image({
           filename:req.file.filename,
           fileid:req.file.id,
           userId: uid,
           originalname:req.file.originalname
       });
       newImage.save().then((image)=>{
           return res.status(200).json({
               success:true,
               msg:"image uploaded successfully",
               image
           })
       }).catch((err)=>{
           console.log(err);
       })
    

})

//Get most recent image of the user and return the object in response
imageRouter.get(`/upload/image/:userid`,(req,res)=>{
    const uid=mongoose.mongo.ObjectId(req.params.userid);
    Image.find({userId:uid}).then((images)=>{
        console.log(images[images.length-1]);
        let serveimg= images[images.length-1];
        if(serveimg){
           
           return res.status(200).json({
                success:true,
                image:serveimg
            })
        }else{
           return res.status(404).json({
                success:false,
                msg:"no profile pic found"
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
})

//Stream image to the browser
imageRouter.get(`/upload/:filename`,(req,res)=>{
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
})

//Delete the most recent image of user
imageRouter.delete(`/upload/image/:userid/delete`,(req,res)=>{
    const uid=mongoose.mongo.ObjectId(req.params.userid);
    Image.find({userid:uid}).then((images)=>{
        const recent= images[images.length-1];
        Image.deleteOne({fileid:recent.fileid}).then((image)=>{
            
            gfs.delete(recent.fileid,(err,data)=>{
                if(err){
                    console.log(err);
                 return   res.status(500).json({msg:"error deleting file"});
                }
              return  res.status(200).json({msg:"file deleted"});
            })


        })
       

    }).catch((err)=>{
        console.log(err);
    })



    
})
return imageRouter;
}