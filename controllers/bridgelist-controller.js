import { BridgeSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const bridgelistController = {
  index: {
    handler: async function (request, h) {
      const bridgelist = await db.bridgelistStore.getBridgelistById(request.params.id);
      const viewData = {
        title: "Bridgelist",
        bridgelist: bridgelist,
      };
      return h.view("bridgelist-view", viewData);
    },
  },

  addBridge: {
    validate: {
      payload: BridgeSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentBridgelist = await db.bridgelistStore.getBridgelistById(request.params.id);
        return h.view("bridgelist-view", { title: "Add bridge error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const bridgelist = await db.bridgelistStore.getBridgelistById(request.params.id);
      const newBridge = {
        bridgename: request.payload.bridgename,
        location: request.payload.location,
        bridgetype: request.payload.bridgetype,
      };
      await db.bridgeStore.addBridge(bridgelist._id, newBridge);
      return h.redirect(`/bridgelist/${bridgelist._id}`);
    },
  },

  deleteBridge: {
    handler: async function(request, h) {
      const bridgelist = await db.bridgelistStore.getBridgelistById(request.params.id);
      await db.bridgeStore.deleteBridge(request.params.bridgeid);
      return h.redirect(`/bridgelist/${bridgelist._id}`);
    },
  },
};