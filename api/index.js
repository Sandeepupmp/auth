import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './router/user.router.js'
import authRouter from './router/auth.router.js'
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "enternal server error"
    return res.status(statusCode).json({
        message: message,
        StatusCode: statusCode,
        success: false
    })

})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongo has been connected")
}).catch((error)=>{
    console.log(error)
})

app.listen(3000, ()=>{
    console.log("express app work on port 3000")
})