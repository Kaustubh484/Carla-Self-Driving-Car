const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);
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
}

});
// userschema.plugin(passportLocalMongoose);
let User = new mongoose.model('user',userschema);
module.exports= User;