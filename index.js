const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {connection} = require("./configs/db");
const {userRouter} = require("./routes/user.routes");
const {postRouter} = require("./routes/post.routes");

const {authenticator}=require("./middlewares/authenticate.middleware")

const app=express();

app.use(express.json());
app.use(cors({
 origin:"*"
}));
app.use("/users",userRouter);

app.use(authenticator)
app.use("/posts",postRouter);

app.get("/",(req,res)=>{
 res.send("Welcome to Linkedin Database")
})


app.listen(process.env.PORT,async ()=>{
 try {
  await connection
  console.log("db connected successfully")
 } catch (error) {
  console.log("db not connected")
 }
 console.log(`server started at port ${process.env.PORT}`)
})