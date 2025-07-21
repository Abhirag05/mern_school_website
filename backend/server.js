import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './config/connection.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

//App config
const app=express()
const port=process.env.PORT || 4000
connectCloudinary();

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api',adminRouter)


app.get('/',(req,res)=>{
  res.send("SJLPS BackEnd Working")
}) 


app.listen(port,()=>{
  console.log("Server started on PORT "+port);
  
})


