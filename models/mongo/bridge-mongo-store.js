import { Bridge } from "./bridge.js";
import { Bridgelist } from "./bridgelist.js";

export const bridgeMongoStore = {
    async getAllBridges() {
      const bridges = await Bridge.find().lean();
      return bridges;
    },
  
    async addBridge(bridgelistId, bridge) {
      bridge.bridgelistid = bridgelistId;
      const newBridge = new Bridge(bridge);
      const bridgeObj = await newBridge.save();
      return this.getBridgeById(bridgeObj._id);
    },
  
    async getBridgesByBridgelistId(id) {
      const bridges = await Bridge.find({ bridgelistid: id }).lean();
      return bridges;
    },

    async getBridgeById(id) {
        if (id) {
          const bridge = await Bridge.findOne({ _id: id }).lean();
          return bridge;
        }
        return null;
      },
    
      async deleteBridge(id) {
        try {
          await Bridge.deleteOne({ _id: id });
        } catch (error) {
          console.log("bad id");
        }
      },
    
      async deleteAllBridges() {
        await Bridge.deleteMany({});
      },
    
      async updateBridge(bridge, updatedBridge) {
        const bridgeDoc = await Bridge.findOne({ _id: bridge._id });
        bridgeDoc.bridgename = updatedBridge.bridgename;
        bridgeDoc.location = updatedBridge.location;
        bridgeDoc.bridgetype = updatedBridge.bridgetype;
        await bridgeDoc.save();
    },
};