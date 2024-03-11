import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const bridgeJsonStore = {
  async getAllBridges() {
    await db.read();
    return db.data.bridges;
  },

  async addBridge(bridgelistId, bridge) {
    await db.read();
    bridge._id = v4();
    bridge.bridgelistid = bridgelistId;
    db.data.bridges.push(bridge);
    await db.write();
    return bridge
  },

  async getBridgesByBridgelistId(id) {
    await db.read();
    let foundBridges = db.data.bridges.filter((bridge) => bridge.bridgelistid === id);
    if (!foundBridges) {
      foundBridges = null;
    }
    return foundBridges;
  },

  async getBridgeById(id) {
    await db.read();
    let foundBridge = db.data.bridges.find((bridge) => bridge._id === id);
    if (!foundBridge) {
      foundBridge = null;
    }
    return foundBridge;
  },

  async getBridgelistBridges(bridgelistId) {
    await db.read();
    let foundBridges = bridges.filter((bridge) => bridge.bridgelistid === bridgelistId);
    if (!foundBridges) {
      foundBridges = null;
    }
    return foundBridges;
  },

  async deleteBridge(id) {
    await db.read();
    const index = db.data.bridges.findIndex((bridge) => bridge._id === id);
    if (index !== -1)  db.data.bridges.splice(index, 1);
    await db.write();
  },

  async deleteAllBridges() {
    db.data.bridges = [];
    await db.write();
  },

  async updateBridge(bridge, updatedBridge) {
    bridge.bridgename = updatedBridge.bridgename;
    bridge.location = updatedBridge.location;
    bridge.bridgetype = updatedBridge.bridgetype;
    await db.write();
  },
};
