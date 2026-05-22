// import { sendEmailProgrammatically } from "../Email_Middleware/nodemailer.config.js";
import { Post } from "../models/Post.js";
import { User } from "../models/Users.js";
import { SubscriptionData } from "../models/Subscription.js";
import { notifySubscribersOfNewPost } from "../utils/mailService.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    getCloudinarySignature() {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = "BuildCareerFoundation";
      const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        process.env.CLOUDINARY_API_SECRET
      );
      
      return {
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder,
      };
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

      // Notify Subscribers asynchronously
      try {
        const subscribers = await SubscriptionData.find({});
        const emails = subscribers.map(s => s.subscriptionWithEmail);
        if (emails.length > 0) {
          notifySubscribersOfNewPost(emails, post);
        }
      } catch (err) {
        console.error("Failed to fetch subscribers for notification:", err.message);
      }

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

      const oldPost = await Post.findById(post_id);

      const updatedData = await Post.findByIdAndUpdate(
        post_id,
        dataCapturedToBeUpdated,
        {
          new: true,
        }
      );

      // Clean up removed images from Cloudinary
      if (oldPost && oldPost.image_url && image_url) {
        let oldMain = Array.isArray(oldPost.image_url) ? oldPost.image_url[0] : oldPost.image_url;
        if (oldMain && oldMain.filename && oldMain.filename !== image_url.filename) {
          try { await cloudinary.uploader.destroy(oldMain.filename); } catch (e) { console.error(e); }
        }
      }

      if (oldPost && oldPost.image_urls && image_urls) {
        const newFilenames = image_urls.map(img => img?.filename);
        for (const img of oldPost.image_urls) {
          if (img && img.filename && !newFilenames.includes(img.filename)) {
            try {
              await cloudinary.uploader.destroy(img.filename);
            } catch (err) {
              console.error("Error deleting old image from Cloudinary:", err);
            }
          }
        }
      }

      return updatedData;
    },

    async deletePost(parent, args, context) {
      const { input } = args;
      const post = await Post.findById(input);
      if (post && post.image_url) {
        let mainImg = Array.isArray(post.image_url) ? post.image_url[0] : post.image_url;
        if (mainImg && mainImg.filename) {
          try { await cloudinary.uploader.destroy(mainImg.filename); } catch (e) { console.error(e); }
        }
      }
      if (post && post.image_urls) {
        for (const img of post.image_urls) {
          if (img && img.filename) {
            try {
              await cloudinary.uploader.destroy(img.filename);
            } catch (err) {
              console.error("Error deleting image from Cloudinary:", err);
            }
          }
        }
      }
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
  PostReturned: {
    image_url: (post) => {
      let img = post.image_url;
      if (Array.isArray(img)) {
        img = img[0] || { url: "", filename: "" };
      }
      if (!img) return { url: "", filename: "" };

      return {
        url: Array.isArray(img.url) ? img.url[0] : (img.url || ""),
        filename: Array.isArray(img.filename) ? img.filename[0] : (img.filename || "")
      };
    }
  }
};
