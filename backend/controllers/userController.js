const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res)=>{
   try{
     const {name, email, password} = req.body;
    if(!name && !email && !password){
      return res.status(400).json({
        message : "Please fill all the fields"
      })
    }

    const existingUser = await userModel.findOne({email})

    if(existingUser){
      return res.status(400).json({
        message : "User already exists"
      })
    }

  const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name,
      email,
      password : hashedPassword
    })

    res.status(201).json({
      message : "User Registered successfully",
      user : {
        id : user._id,
        name : user.name,
        email : user.email
      }
    })
   }
   catch(error){

    res.status(500).json({
      message : "server error",
      error : error.message

    })
    
  }
}

const loginUser = async (req,res)=>{
  try{
    const {email,password} = req.body

  if(!email && !password){
    return res.status(500).json({
      message : "Email and password are required"
    })
  }

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(401).json({
    message : "Invalid email or password"
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if(!isPasswordCorrect){
    return res.status(401).json({
      message : "Invalid email or password"
    })
  }

  const token = jwt.sign({ userid : user._id}, process.env.JWT_SECRET_KEY)

  res.json({
    message : "User Login Successfully",
    token,
    user: { 
      id : user._id,
      name : user.name,
      email: user.email
    }
  })
  }
  catch(error){
    res.json(500).json({
      message : "Server error",
      error : error.message
    })
  }

}

module.exports = {registerUser, loginUser}