// import { sendEmailProgrammatically } from "../Email_Middleware/nodemailer.config.js";
import { Post } from "../models/Post.js";
import { User } from "../models/Users.js";

export const postResolver = {
  Query: {
    async getAllPosts(parent, args, context) {
      const posts = await Post.find({});
      return posts;
    },
    async getOnePost(parent, args, context) {
      const { id } = args;
      const post = await Post.findById(id);
      return post;
    },
  },

  Mutation: {
    async addPost(parent, args, context) {
      const { input } = args;
      const {
        title,
        category,
        content,
        contentSections,
        image_url,
        image_urls,
        youtube_video_url,
        user_id,
      } = input;

      const dataCapturedToBeSaved = {
        title,
        category,
        content,
        contentSections,
        image_url,
        image_urls,
        youtube_video_url,
      };

      const post = await Post.create(dataCapturedToBeSaved);

      await User.findByIdAndUpdate(
        user_id,
        { $push: { posts: post._id } },
        { new: true, useFindAndModify: false }
      );

      return post;
    },

    async updatePost(parent, args, context) {
      const { input } = args;
      const {
        title,
        category,
        content,
        contentSections,
        image_url,
        image_urls,
        youtube_video_url,
        post_id,
      } = input;

      const dataCapturedToBeUpdated = {
        title,
        category,
        content,
        contentSections,
        image_url,
        image_urls,
        youtube_video_url,
      };

      const updatedData = await Post.findByIdAndUpdate(
        post_id,
        dataCapturedToBeUpdated,
        {
          new: true,
        }
      );

      return updatedData;
    },

    async deletePost(parent, args, context) {
      const { input } = args;
      const deleteData = await Post.findByIdAndDelete(input);
      if (deleteData) {
        return {
          isDeleted: true,
          message: "The post has been deleted successfully !!",
        };
      }
      return {
        isDeleted: false,
        message: "The post has not been deleted.",
      };
    },
  },
};
