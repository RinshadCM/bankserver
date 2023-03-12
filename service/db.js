// Server mdb integration

// 1. Import mongoose 

const mongoose=require('mongoose')

// 2. State connection string via mongoose
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})

// 3. Define a bank database Model
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:Number,
    balance:Number,
    transaction:[]
})

// 4.Export the schema to use in another files
module.exports={
    User
}