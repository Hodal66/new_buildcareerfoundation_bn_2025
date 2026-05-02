import { sendContactEmail, notifyAdmin } from "../utils/mailService.js";
import { ContactUsData } from "../models/ContactUs.js";

export const ContactUsResolver = {
  Query: {
    async getAllContactUs(parent, args, context) {
      const ContactUss = await ContactUsData.find({});
      return ContactUss;
    },
    async getOneContactUs(parent, args, context) {
      const { id } = args;
      const contact = await ContactUsData.findById(id);
      return contact;
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

      const ContactUsReturnedData = await ContactUsData.create(
        dataCapturedToBeSaved
      );

      // Trigger dual emails concurrently
      try {
        await Promise.all([
          sendContactEmail(email, fullName),
          notifyAdmin("CONTACT", { fullName, email, phoneNumber, message })
        ]);
        console.log("✅ Dual contact emails sent successfully.");
      } catch (err) {
        console.error("❌ Dual contact emails failed:", err.message);
      }

      return ContactUsReturnedData;
    },

    async deleteContactUs(parent, args, context) {
      const { input } = args;
      const deleteData = await ContactUsData.findByIdAndDelete(input);
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
