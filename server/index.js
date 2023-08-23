const express = require('express');
const app = express ();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
const User = require('./models/user.model')
mongoose.connect('mongodb://localhost:27017/full-mern-stack-video');

app.post('/api/register',async (req,res)=>{
    console.log(req.body);
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({'status':'ok'})
    }
    catch(err){
        res.json({'status':'error'})
    }
    
});


app.post('/api/login',async (req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(user){
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        },'secret123');
        res.json({status:'ok',user:token});

    }
    else{
        res.json({'status':'error'});
    }
    
    
});



app.get('/hello', (req,res) => {
res.send('hello world');
});
app. listen (1337, () => {
console. log('Server started on 1337');
});