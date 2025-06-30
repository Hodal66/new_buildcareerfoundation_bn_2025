// import { sendEmailProgrammatically } from "../Email_Middleware/nodemailer.config.js";
import { ContactUs } from "../models/ContactUs.js";

export const ContactUsResolver = {
  Query: {
    async getAllContactUs(parent, args, context) {
      const ContactUss = await ContactUs.find({});
      return ContactUss;
    },
    async getOneContactUs(parent, args, context) {
      const { id } = args;
      const ContactUs = await ContactUs.findById(id);
      return ContactUs;
    },
  },

  Mutation: {
    async addContactUs(parent, args, context) {
      const { input } = args;
      const { fullName, phoneNumber, email, message } = input;

      const dataCapturedToBeSaved = {
        fullName,
        phoneNumber,
        email,
        message,
      };

      const ContactUsReturnedData = await ContactUs.create(
        dataCapturedToBeSaved
      );
      return ContactUsReturnedData;
    },

    async deleteContactUs(parent, args, context) {
      const { input } = args;
      const deleteData = await ContactUs.findByIdAndDelete(input);
      if (deleteData) {
        return {
          isDeleted: true,
          message: "The ContactUs has been deleted successfully !!",
        };
      }
      return {
        isDeleted: false,
        message: "The ContactUs has not been deleted.",
      };
    },
  },
};
