const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/auth',userRoutes)

app.get('/api/health',(req,res)=>{
    res.json({
        message : "AI code-reviewer api s running"
    })
})

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})