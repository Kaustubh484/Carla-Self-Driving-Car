require(`dotenv`).config();
// module exports
const express =require(`express`);
const mongoose = require(`mongoose`);
const bodyParser= require('body-parser');
const path= require(`path`);
const cors =require(`cors`);
//GridFs modules
const multer = require(`multer`);
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid= require(`gridfs-stream`);
//Auth modules
const crypto= require('crypto');
const authRoutes= require(`./routes/authRoutes`);
const session= require(`express-session`);

//Image upoading route
const imgRoutes= require(`./routes/imageRoutes`);

//User Routes
const userRoutes=require(`./routes/useRoutes`);

 const app= express();
 app.use(express.urlencoded({extended:true}));
 app.use(bodyParser.json());
 app.use(cors({
      origin:`http://localhost:3000`,
     credentials:true,
     allowedHeaders:`Content-Type,Authorization,Cookie`
 }));
 console.log(cors);

app.use(session({
    secret: 'kaustubhssecret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    maxAge:60*60*24*1000
    }
}))

 const passport=require(`./config/passport`);
app.use(passport.initialize());
app.use(passport.session());
//  mongoose.connect('mongodb://localhost:27017/HackSquad', { useNewUrlParser: true });
 const mongooseURI=`mongodb://localhost:27017/HackSquad`;
 mongoose.connect(mongooseURI, { useNewUrlParser: true });
db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to Mongo");
})
db.on('error', (err) => {
    console.log("Error in connection to Mongo");
})


 

 //initialise GridFs storage
 const storage= new GridFsStorage({
     url:mongooseURI,
     file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: 'uploads'
            };
            resolve(fileInfo);
          });
        });
      }
 })

 const upload= multer({storage});
 
 
//include image uploading logic
app.use(imgRoutes(upload));
 
  //User routes
  app.use(userRoutes);

 app.use(authRoutes);
//  app.get('/home',(req,res)=>{
//      res.send(`Hello`);
//  })

 app.listen(5000,()=>{
     console.log("Server started on 5000");
 })