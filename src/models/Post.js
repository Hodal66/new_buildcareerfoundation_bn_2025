import mongoose, { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

  // 👇 New content sections format
  contentSections: [
    {
      sectionTitle: {
        type: String,
        required: true,
      },
      paragraph1: {
        type: String,
        required: true,
      },
      paragraph2: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: true,
  },

  image_url: [
    {
      url: String,
      filename: String,
    },
  ],
  image_urls: [
    {
      url: String,
      filename: String,
    },
  ],
  youtube_video_url: {
    type: String,
    required: true,
  },
  date_posted: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Post = model("Post", postSchema);

export { Post };
