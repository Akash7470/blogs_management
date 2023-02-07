import express from "express";
import Blog from "../models/blogInfo.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (req, res) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.json({ error: "Blogs are Not Found" });
  }
  return res.json({ blogs });
});

export default blogsRouter;
