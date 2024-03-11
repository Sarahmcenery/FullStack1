import { userMemStore } from "./mem/user-mem-store.js";
import { bridgelistMemStore } from "./mem/bridgelist-mem-store.js";
import { bridgeMemStore } from "./mem/bridge-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { bridgelistJsonStore } from "./json/bridgelist-json-store.js";
import { bridgeJsonStore } from "./json/bridge-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { bridgelistMongoStore } from "./mongo/bridgelist-mongo-store.js";
import { bridgeMongoStore } from "./mongo/bridge-mongo-store.js";


export const db = {
  userStore: null,
  bridgelistStore: null,
  bridgeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.bridgelistStore = bridgelistJsonStore;
        this.bridgeStore = bridgeJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.bridgelistStore = bridgelistMongoStore;
        this.bridgeStore = bridgeMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.bridgelistStore = bridgelistMemStore;
        this.bridgeStore = bridgeMemStore;
    }
  },
};
