import express from "express";
import mongoose from "mongoose";
import blogInfo from "../models/blogInfo.js";
import userInfo from "../models/userInfo.js";

const addBlogRouter = express.Router();

addBlogRouter.post("/", async (req, res, err) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await userInfo.findById(user);
    // console.log(existingUser);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.json({
      message: "User Not Found bY This Id In Adding the Blog",
    });
  }
  const blog = new blogInfo({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    await blog.populate("user");
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.json({ message: error });
  }
  return res.json({ blog });
});

export default addBlogRouter;
