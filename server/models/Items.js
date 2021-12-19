const mongoose= require(`mongoose`);
let itemSchema =new mongoose.Schema({
    name:String,
    price:Number,
})

const Item=   mongoose.model(`item`,itemSchema);
module.exports= Item;
