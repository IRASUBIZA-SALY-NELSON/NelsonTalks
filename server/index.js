const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

mongoose.connect(
  "mongodb+srv://irasubizasalynelson:nelson@chat-app.bxmi4o7.mongodb.net/NelsonTalks?retryWrites=true&w=majority&appName=chat-app"
);
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(request,response)=>{
    response.json({
        message : "Server running at " + PORT
    })
})

//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at " + PORT)
    })
})
