import { BridgelistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const bridgelists = await db.bridgelistStore.getUserBridgelists(loggedInUser._id);
      const viewData = {
        title: "Placemarks Dashboard",
        user: loggedInUser,
        bridgelists: bridgelists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addBridgelist: {
    validate: {
      payload: BridgelistSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Bridgelist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newBridgeList = {
        userid: loggedInUser._id,
        title: request.payload.bridgename,
      };
      await db.bridgelistStore.addBridgelist(newBridgeList);
      return h.redirect("/dashboard");
    },
  },

  deleteBridgelist: {
    handler: async function (request, h) {
      const bridgelist = await db.bridgelistStore.getBridgelistById(request.params.id);
      await db.bridgelistStore.deleteBridgelistById(bridgelist._id);
      return h.redirect("/dashboard");
    },
  },


};