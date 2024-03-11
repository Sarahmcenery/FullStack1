import Mongoose from "mongoose";

const { Schema } = Mongoose;

const bridgeSchema = new Schema({
  bridgename: String,
  location: String,
  bridgetype: String,
  bridgelistid: {
    type: Schema.Types.ObjectId,
    ref: "Bridgelist",
  },
});

export const Bridge = Mongoose.model("Bridge", bridgeSchema);