import Mongoose from "mongoose";

const { Schema } = Mongoose;

const bridgelistSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Bridgelist = Mongoose.model("Bridgelist", bridgelistSchema);