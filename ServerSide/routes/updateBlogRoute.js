import express from "express";
import blogInfo from "../models/blogInfo.js";

const updateBlogRouter = express.Router({ mergeParams: true });

updateBlogRouter.put("/", async (req, res) => {
  const { title, description, image } = req.body;

  const blogId = req.params._id;

  let blog;
  try {
    blog = await blogInfo.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
      image: image,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.json({ message: "Unable to Update" });
  }

  return res.json({ blog });
});

export default updateBlogRouter;
