import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: String,
  email: { type: String, unique: true },
  username: String,
  password: String,
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "BlogInfo",
      required: true,
    },
  ],
  usertype: {
    type: String,
    required: true,
  },
});

export default mongoose.model("UserInfo", userSchema);
