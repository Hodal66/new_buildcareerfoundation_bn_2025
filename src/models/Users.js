import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  secondName: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "mentor", "admin"],
    default: "student",
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  }],
});

const User = model("User", userSchema);

export { User };
