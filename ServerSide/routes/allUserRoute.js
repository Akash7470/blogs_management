import express from "express";
import userInfo from "../models/userInfo.js";

const allUserRouter = express.Router();

allUserRouter.get("/", async (req, res) => {
  let users;
  try {
    users = await userInfo.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    return res.json({ message: "No Users found" });
  }
  return res.json({ users });
});

export default allUserRouter;
