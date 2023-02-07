import express from "express";
import blogInfo from "../models/blogInfo.js";

const getBlogByIdRouter = express.Router({ mergeParams: true });

getBlogByIdRouter.get("/", async (req, res, err) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await blogInfo.findById(id).populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.json({ message: "Blog Not Found BY this Id" });
  }

  return res.json({ blog });
});

export default getBlogByIdRouter;
