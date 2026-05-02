import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// var jwt = require('jsonwebtoken');
import { User } from "../models/Users.js";
import config from "../../config.js";
import jwt from "jsonwebtoken";

export function decodeAuthHeader(authHeader) {
  const token = authHeader.replace("Bearer ", ""); // 3
  if (!token) {
    throw new Error("No token found");
  }
  const decodedData = jwt.verify(token, config.jwt.JWT_SECRET);
  return decodedData; // 4
}

export const userResolver = {
  Query: {
    async get_all_users() {
      const allUsers = await User.find({});
      return allUsers;
    },
    async get_all_users_details() {
      const allUsers = await User.find({}).populate({
        path: "posts",
      });
      return allUsers;
    },
  },
  Mutation: {
    async sign_up(parent, args, context) {
      const { input } = args;
      const { email, password, firstName, secondName, role } = input;

      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({
        firstName,
        secondName,
        email,
        password: hashedPassword,
        role: role || "student",
      });
      console.log(createdUser);

      const token = jwt.sign(
        { email: createdUser.email, userId: createdUser._id, firstName:createdUser.firstName, secondName: createdUser.secondName },
        config.jwt.JWT_SECRET
      );
      return {
        user: createdUser,
        token,
      };
    },

    async login_user(parent, args, context) {
      const { email, password } = args;
      const existingUser = await User.findOne({ email }).exec();
      console.log(existingUser);
      if (!existingUser) {
        throw new Error("User DOES NOT exists");
      }
      const Valid = await bcrypt.compare(password, existingUser.password);
      if (!Valid) {
        throw new Error("Invalid email or password!");
      }
      const token = jwt.sign(
        {
          userId: existingUser._id,
          email: existingUser.email,
        },
        config.jwt.JWT_SECRET
      );
      return {
        user: existingUser,
        token,
      };
    },
    async update_user(parent, args, context) {
      const { id, input } = args;
      const { firstName, secondName, email, role } = input;
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { firstName, secondName, email, role },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new Error("User not found.");
      }

      return updatedUser;
    },

    async delete_user(parent, args, context) {
      const { id } = args;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        throw new Error("User not found.");
      }

      return "User deleted successfully.";
    },
  },
};
