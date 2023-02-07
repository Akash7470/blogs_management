import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import mongoose from "mongoose";
import allUserRoute from "./routes/allUserRoute.js";
import registerRoute from "./routes/registerUser.js";
import loginUserRoute from "./routes/loginUserRoute.js";

import allBlogsRoute from "./routes/allBlogsRoute.js";
import addBlogRoute from "./routes/addBlogRoute.js";
import updateBlogRoute from "./routes/updateBlogRoute.js";
import getBlogByIdRoute from "./routes/getBlogByIdRoute.js";
import deleteBlogByIdRoute from "./routes/deleteBlogByIdRoute.js";
import getBlogByUserIdRoute from "./routes/getBlogByUserIdRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/register/user", registerRoute);
app.use("/login/user", loginUserRoute);
app.use("/allusers", allUserRoute);
app.use("/allblogs", allBlogsRoute);
app.use("/blog/add", addBlogRoute);
app.use("/blog/update/:_id", updateBlogRoute);
app.use("/blog/:id", getBlogByIdRoute);
app.use("/blog/delete/:id", deleteBlogByIdRoute);
app.use("/user/blog/:id", getBlogByUserIdRoute);

mongoose.set("strictQuery", false);
const mongoUrl =
  "mongodb+srv://Akash747069:Akash7470@block.4pa8fmt.mongodb.net/?retryWrites=true&w=majority";

connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("connected Successfully"))
  .catch((e) => console.log(e));

//UserData -->

// app.post("/userData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, jwt_secret);
//     // console.log(user, "--------------jhuh");
//     const userEmail = user.email;
//     User.findOne({ email: userEmail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {}
// });

app.listen(5000);
