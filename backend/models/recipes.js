const mongoose=require('mongoose');
const Recipe= new mongoose.Schema(
{
    title :{type:String},
    content : {type:String},
    email:{type:String}
},
{
    timestamps:true,
}
);

const recipeModel=mongoose.model('Recipe',Recipe);

module.exports=recipeModel;