const express =require(`express`);
const mongoose = require(`mongoose`);
const bodyParser= require('body-parser');
const cors =require(`cors`);
 const app= express();
 app.use(bodyParser.json());
 app.use(cors());
//  app.use(express.urlencoded({extended:true}));
 mongoose.connect('mongodb://localhost:27017/React', { useNewUrlParser: true });
 db = mongoose.connection;
 db.once('open', () => {
     console.log("Connected to Mongo");
 })
 db.on('error', () => {
     console.log("Error in connection to Mongo");
 })
 const Itemroutes= require(`./routes/itemRoutes`);
 
 
  

 app.use(Itemroutes);
 app.get('/home',(req,res)=>{
     res.send(`Hello`);
 })

 app.listen(5000,()=>{
     console.log("Server started on 5000");
 })