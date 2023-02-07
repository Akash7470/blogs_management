import express from "express";
import blogInfo from "../models/blogInfo.js";

const deleteBlogByIdRouter = express.Router({ mergeParams: true });

deleteBlogByIdRouter.delete("/", async (req, res, err) => {
  const id = req.params.id;
  console.log(id);
  let blog;
  try {
    blog = await blogInfo.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.json({ message: "Blog Not Deleted " });
  }

  return res.json({ message: "Deleted Successfully" });
});

export default deleteBlogByIdRouter;
