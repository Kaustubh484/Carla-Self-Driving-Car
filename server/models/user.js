const mongoose = require(`mongoose`);
let userschema= new mongoose.Schema({
username:{
    type:String,
    
},
hash: {
    type:String,
    
},
salt:{
    type:String
},
email:{
    type:String,
    required:true
},
GitHubLink:String,
LinkedinLink:String,
Description:String

});

let User = new mongoose.model('user',userschema);
module.exports= User;