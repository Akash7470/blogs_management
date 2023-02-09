import express from "express";
import { hash } from "bcrypt";
import User from "../models/userInfo.js";

const registerRouter = express.Router();

//Register User -->

registerRouter.post("/", async (req, res) => {
  const { fullname, email, username, password, usertype } = req.body;
  const encryptedPassword = await hash(password, 5);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ Error: "User Already Exists" });
    }
    const createdUser = await User.create({
      fullname,
      email,
      username,
      password: encryptedPassword,
      blogs: [],
      usertype,
    });
    res.json({ createdUser });
  } catch (error) {
    res.send({ status: "error" });
  }
});

export default registerRouter;
