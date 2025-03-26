import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import passport from 'passport';
import "./passport/github.auth.js"
import connectMongoDB from './db/connectMongoDB.js';
import session from 'express-session';
import path from 'path'
const app=express();
const PORT=process.env.PORT || 5000
const __dirname = path.resolve();
console.log("__dirname",__dirname);
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist",'index.html'));
})
app.listen(5000,()=>{
    console.log(`server is running on ${PORT}`)
    connectMongoDB();
})