import express from "express";
import userInfo from "../models/userInfo.js";

const getBlogByUserIdRouter = express.Router({ mergeParams: true });

getBlogByUserIdRouter.get("/", async (req, res) => {
  const userId = req.params.id;

  let userBlogs;

  try {
    userBlogs = await userInfo.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }

  if (!userBlogs) {
    return res.json({ message: "No Blogs Found in this User" });
  }
  return res.json({ blogs: userBlogs });
});

export default getBlogByUserIdRouter;
