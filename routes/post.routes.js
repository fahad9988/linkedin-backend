const express=require("express");

const postRouter=express.Router();
const {PostModel}=require("../models/post.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


postRouter.post("/add",async (req,res)=>{
 const post=req.body;
 try {
  const Post=new PostModel(post);
  await Post.save();
  res.send({"msg":"Post created successfully"});
 } catch (error) {
  res.send({"err":error.message});
 }
})


postRouter.get("/",async (req,res)=>{
 try {
  let {page,min,max}=req.query;

  let posts;
  if(page){
   page=page-1;
   posts=await PostModel.find({userID:req.body.userID}).skip(page*3).limit(3);
  }else{
   posts=await PostModel.find({userID:req.body.userID});
  }

 
  res.send({"posts":posts});
 } catch (error) {
  res.send({"err":error.message});
 }
})

postRouter.get("/top",async (req,res)=>{
 try {
  let {page}=req.query;
  let posts;
  if(page){
   page=page-1;
   posts=await PostModel.find({userID:req.body.userID}).sort({no_of_comments:-1}).skip(page*3).limit(3);
  }else{
   posts=await PostModel.find({userID:req.body.userID}).sort({no_of_comments:-1});
  }
 
  res.send({"posts":posts});
 } catch (error) {
  res.send({"err":error.message});
 }
})

postRouter.patch("/update/:id",async (req,res)=>{
 const {id}=req.params;
 const payload=req.body;
 try {
  const user=await PostModel.findOne({_id:id});
  const noteId=user.userID;
  const userId=req.body.userID;
  if(noteId!=userId){
   res.send({"msg":"You are not authorized"})
  }else{
   await PostModel.findByIdAndUpdate({_id:id},payload)
   res.send({"msg":"post updated successfully"})
  }
 } catch (error) {
res.send({"err":error.message})

 }
})

postRouter.delete("/delete/:id",async (req,res)=>{
 const {id}=req.params;
 try {
  const user=await PostModel.findOne({_id:id});
  const noteId=user.userID;
  const userId=req.body.userID;
  if(noteId!=userId){
   res.send({"msg":"You are not authorized"})
  }else{
   await PostModel.findByIdAndDelete({_id:id})
   res.send({"msg":"post deleted successfully"})
  }
 } catch (error) {
res.send({"err":error.message})

 }
})



module.exports={
 postRouter
}