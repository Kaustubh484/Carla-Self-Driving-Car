require(`dotenv`).config();
const express =require(`express`);
const mongoose = require(`mongoose`);
const bodyParser= require('body-parser');
const cors =require(`cors`);
// const passport=require(`passport`);
const crypto= require('crypto');
const authRoutes= require(`./routes/authRoutes`);
const session= require(`express-session`);

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
 mongoose.connect('mongodb://localhost:27017/HackSquad', { useNewUrlParser: true });
 db = mongoose.connection;
 db.once('open', () => {
     console.log("Connected to Mongo");
 })
 db.on('error', () => {
     console.log("Error in connection to Mongo");
 })
 
//  app.use((req,res,next)=>{
//      console.log(req.session);
//  })
 
  

 app.use(authRoutes);
//  app.get('/home',(req,res)=>{
//      res.send(`Hello`);
//  })

 app.listen(5000,()=>{
     console.log("Server started on 5000");
 })