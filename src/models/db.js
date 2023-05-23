import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { countyMongoStore } from "./mongo/county-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.countyStore = countyMongoStore;
        this.reviewStore = reviewMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};
