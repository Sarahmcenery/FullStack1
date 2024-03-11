import { v4 } from "uuid";

let bridges = [];

export const bridgeMemStore = {
  async getAllBridges() {
    return bridges;
  },

  async addBridge(bridgelistId, bridge) {
    bridge._id = v4();
    bridge.bridgelistid = bridgelistId;
    bridges.push(bridge);
    return bridge;
  },

  async getBridgesByBridgelistId(id) {
    let foundBridges = bridges.filter((bridge) => bridge.bridgelistid === id);
    if (!foundBridges) {
      foundBridges = null;
    }
    return foundBridges;
  },

  async getBridgeById(id) {
    let foundBridge = bridges.find((bridge) => bridge._id === id);
    if (!foundBridge) {
      foundBridge = null;
    }
    return foundBridge;
  },

  async getBridgelistBridges(bridgelistId) {
   let foundBridges = bridges.filter((bridge) => bridge.bridgelistid === bridgelistId);
    if (!foundBridges) {
      foundBridges = null;
    }
    return foundBridges;
  },

  async deleteBridge(id) {
    const index = bridges.findIndex((bridge) => bridge._id === id);
    if (index !== -1) bridges.splice(index, 1);
  },

  async deleteAllBridges() {
    bridges = [];
  },

  async updateBridge(bridge, updatedBridge) {
    bridge.bridgename = updatedBridge.bridgename;
    bridge.location = updatedBridge.location;
    bridge.bridgetype = updatedBridge.bridgetype;
  },
};