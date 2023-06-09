import { db } from "../models/db.js";

export const placesController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const counties = await db.countyStore.getAllCounties();
      return h.view("Place", { 
        title: "Make a Place",
        counties: counties,
        user: loggedInUser,
      }
        );
    },
  },

  report: {
    handler: async function (request, h) {
      const places = await db.placeStore.getAllPlaces();
      const loggedInUser = request.auth.credentials;
      const count = places.length;
      return h.view("Report", {
        title: "Favorite Walk Trail",
        places: places,
        count: count,
        user: loggedInUser,
      });
    },
  },

  place: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const rawCounty = request.payload.county.split(",");
        const county = await db.countyStore.findByName(rawCounty[0], rawCounty[1]);
        const { lat, lng } = request.payload;
        await db.placeStore.place(
          request.payload.placename, 
          request.payload.description,
          request.payload.category, 
          loggedInUser._id, 
          county._id,lat, lng);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },


  userplaces: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const userplaces = await db.placeStore.getPlaceByDonor(loggedInUser._id);
  
         const count = userplaces.length;

        const viewData = {
          title: "Your Favorite Walk Trail",
          userplaces: userplaces,
          count: count,
          user: loggedInUser,
        };
        return h.view("users-placelist", viewData);
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  }
  
};
