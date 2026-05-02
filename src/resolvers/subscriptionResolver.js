import { SubscriptionData } from "../models/Subscription.js";
import { sendSubscriptionEmail, notifyAdmin } from "../utils/mailService.js";
export const subscriptionResolver = {
  Query: {
    async getAllSubscriptions() {
      const allSubscriptionData = await SubscriptionData.find({});
      return allSubscriptionData;
    },
  },
  Mutation: {
    async makeSubscribe(_, { input }) {
      const { subscriptionWithEmail } = input;
      console.log("Your Email of Subscription is:", subscriptionWithEmail);

      // Check if user already exists
      const isUserExist = await SubscriptionData.findOne({
        subscriptionWithEmail,
      });

      if (isUserExist) {
        console.log("User already exists in the database!");
        throw new Error("User already exists with this email.");
      }

      // If not exist, create new subscription
      const newSubscription = await SubscriptionData.create(input);
      console.log("Saved Subscriber is:", newSubscription);

      // Concurrent email sending
      try {
        await Promise.all([
          sendSubscriptionEmail(subscriptionWithEmail),
          notifyAdmin("SUBSCRIPTION", { email: subscriptionWithEmail })
        ]);
        console.log("✅ Subscriber dual emails sent.");
      } catch (emailErr) {
        console.error("❌ Subscriber emails failed:", emailErr.message);
      }
      return newSubscription;
    },

    async deleteSubscriber(parent, args, context) {
      const { input } = args;
    

      const deleteData = await SubscriptionData.findByIdAndDelete(
        input
      );

      if (deleteData) {
        return {
          isDeleted: true,
          message: "The Subscriber has been deleted successfully !!",
        };
      }

      return {
        isDeleted: false,
        message: "The Subscriber has not been deleted.",
      };
    },
  },
};
