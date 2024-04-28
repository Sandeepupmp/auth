import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './router/user.router.js'
dotenv.config()

const app = express()

app.use(express.json)
app.use("/api/user",userRouter)
// app.use("/api/auth")

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo has been connected")
}).catch((error)=>{
    console.log(error)
})

app.listen(3030, ()=>{
    console.log("express app work on port 3000")
})