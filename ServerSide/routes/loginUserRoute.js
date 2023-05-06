import Jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import express from "express";
import User from "../models/userInfo.js";

const loginRouter = express.Router();
const { sign } = Jwt;
const jwt_secret = "qr5B5c-sBp1EwRBLm6ImLz8aW_WoYZM9xZWvyjDSTvY";

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email });
  // console.log(loginUser);
  if (!loginUser) {
    return res.json({ error: "User Not Found " });
  }
  if (compareSync(password, loginUser.password)) {
    const token = sign({ loginUser }, jwt_secret);
    if (res.statusCode === 200) {
      return res.json({ status: "Ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  } else {
    return res.json({ status: "error", Error: "Invalid password" });
  }
});

export default loginRouter;
