const express = require('express');
const cors=require('cors');
const app=express();
const User=require('./models/user');
const Recipe=require('./models/recipes')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://monisha:monisha@sampledb.slk2l.mongodb.net/Delicious?retryWrites=true&w=majority")


app.post('/api/register',async (req,res)=>
{
    console.log(req.body);
    try{
        const user =await User({   
            username :req.body.name,
            email :req.body.email,
            password :req.body.password
        }
        )
        user.save();
        
        res.json({status: 'ok'})
    }
   catch(err){
    console.log(err);
   }
    
})

app.post('/api/login',async (req,res)=>
{
    console.log(req.body);
   const user=await User.findOne({email:req.body.email,password:req.body.password});
   if(user)
   {
       const token=jwt.sign({
           username:user.name,
           email:user.email,
       },'moni123')
       console.log(token)
     return res.json({status:'ok',user:token})
   }
   else
   {
    return res.json({status:'ok',user:false})
   }
   
})

app.get('/api/recipes', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'moni123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
        const recipes=await Recipe.find({email:email});
        if(user)
		return res.json({ status: 'ok', quote: 1 ,recipes})
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/createrecipe',async (req,res)=>
{
    const token = req.headers['x-access-token']
    console.log(req.body);
    try{
        const decoded = jwt.verify(token, 'moni123')
		const email = decoded.email
      
        const recipe =await Recipe({   
            title:req.body.title,
            content:req.body.content,
            email
        })
     
        recipe.save()
        return res.json({status: 'ok'})
       
    }
    catch(err){
    console.log(err);
   }
})

app.delete('/api/delete', (req,res)=>
{
    // console.log(req.body.id)
    // try{
    //  Note.deleteOne({_id:req.body.id})
    // // return res.json({status: 'ok'})
    // }
    // catch(err){
    //     console.log(err);
    // }

    const token = req.headers['x-access-token']
    console.log(req.body);
    try{
        const decoded = jwt.verify(token, 'moni123')
		const email = decoded.email
      
        Recipe.deleteOne({_id:req.body.id,email:email}).then(console.log("deleted")).catch(err => console.log(err))
     
       
        return res.json({status: 'ok'})
       
    }
    catch(err){
    console.log(err);
   }

})
app.listen(1337,()=>
{
    console.log("server started");
})