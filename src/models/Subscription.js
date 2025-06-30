import mongoose from "mongoose";

const SubscriptionMongoDbSchema = mongoose.Schema({
  subscriptionWithEmail: {
    type: String,
    required: true,
  },
  date_subscribed: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const SubscriptionData = mongoose.model(
  "Subscription",
  SubscriptionMongoDbSchema
);
