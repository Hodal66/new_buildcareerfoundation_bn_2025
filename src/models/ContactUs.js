import mongoose from "mongoose";

const ContactUsMongoDbSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    require: false,
  },
  message: {
    type: String,
    required: true,
  },
  date_contacted: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const ContactUsData = mongoose.model(
  "ContactUs",
  ContactUsMongoDbSchema
);
