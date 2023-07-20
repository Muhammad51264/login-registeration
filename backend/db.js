const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());
const uri = "";  //add your database link fro atlas
mongoose.connect(uri).catch(e=>console.log(`database ${e}`))


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/users/register", async (req, res)=>{
  try{
    const newPassword =await bcrypt.hash(req.body.password,10)
    await User.create({
      name:req.body.name,
      email:req.body.email,
      password:newPassword
    })
    res.json({status:"ok"})
  }catch(e){

    console.log(e);
		res.json({ status: 'error', error: 'Duplicate email' })

  }
})

app.post("/users/login", async (req, res)=>{

    const user = await User.findOne({email:req.body.email}) 
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (isPasswordValid){
    const token = jwt.sign(
      {
         name:user.name,
         email:user.email,
      },'secret123'
    )
    return res.json({status:"ok" , user:token})
  }else{
    return res.json({status:"error" , user:false})
  }

})

app.get("/users/token", async (req, res)=>{

  const token =req.headers['x-access-token'];
  try{
  const decoded = jwt.decode(token,"sercet123");
  const email=decoded.email;
  const user = await User.findOne({email:email});
  return res.json({status:'ok',name:user.name});
  }catch(e){
console.log(error);
res.json({status:"error", error: "invalid token"});

  }

})

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});