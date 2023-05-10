//import mongoose

const mongoose=require("mongoose")


//connection string

mongoose.connect('mongodb://127.0.0.1:27017/bankServer',{useNewUrlParser:true})


//define collection model

const User=mongoose.model('user',
{
    acno:Number,
    uname:String,
    pasw:String,
    balance:Number,
    transactions:[]
}
)


//export model

module.exports={
    User
}