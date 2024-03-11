import { Bridgelist } from "./bridgelist.js";
import { bridgeMongoStore } from "./bridge-mongo-store.js";

export const bridgelistMongoStore = {
  async getAllBridgelists() {
    const bridgelists = await Bridgelist.find().lean();
    return bridgelists;
  },

  async getBridgelistById(id) {
    if (id) {
      const bridgelist = await Bridgelist.findOne({ _id: id }).lean();
      if (bridgelist) {
        bridgelist.bridges = await bridgeMongoStore.getBridgesByBridgelistId(bridgelist._id);
      }
      return bridgelist;
    }
    return null;
  },

  async addBridgelist(bridgelist) {
    const newBridgelist = new Bridgelist(bridgelist);
    const bridgelistObj = await newBridgelist.save();
    return this.getBridgelistById(bridgelistObj._id);
  },

  async getUserBridgelists(id) {
    const bridgelist = await Bridgelist.find({ userid: id }).lean();
    return bridgelist;
  },

  async deleteBridgelistById(id) {
    try {
      await Bridgelist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllBridgelists() {
    await Bridgelist.deleteMany({});
  }
};