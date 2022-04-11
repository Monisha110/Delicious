const mongoose=require('mongoose');
const User= new mongoose.Schema(
{
    username :{type:String},
    email : {type:String,unique:true},
    password : {type:String},
},
{
    timestamps:true,
}
);

const userModel=mongoose.model('UserData',User);

module.exports=userModel;