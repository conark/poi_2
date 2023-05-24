import { db } from "../models/db.js";

export const placeDetailController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const county = await db.countyStore.getCountyById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        title: "Edit Place",
        county: county,
        place: place,
        user: loggedInUser,
      };
      return h.view("place-detail", viewData);
    },
  },

  update: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const county = await db.countyStore.getCountyById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const newPlace = {
        category: request.payload.category,
        placename: request.payload.placename,
        description: request.payload.description,
        lat:request.payload.lat,
        lng: request.payload.lng,
      };
      await db.placeStore.updatePlace(place, newPlace);
      const viewData = {
        title: "Place Updated",
        county: county,
        place: place,
        user: loggedInUser,
      };
      return h.view("place-detail", viewData).redirect(`/editplace/${place._id}`);
    },
  },
};