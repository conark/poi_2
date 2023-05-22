import Boom from "@hapi/boom";
import {db} from "../models/db.js";


export const placesApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const places = await db.placeStore.getAllPlaces();
      return places;
    },
  },
  findByCounty: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const places = await db.placeStore.getPlacesByCounty(request.params.id);
      return places;
    },
  },
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
        const place = await db.placeStore.getPlaceById(request.params.id);
        return place;
  },
},

  makePlace: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const county = await db.countyStore.findById(request.params.id);
      if (!county) {
        return Boom.notFound("No County with this id");
      }
      const place = await db.placeStore.place(
          request.payload.placename,
          request.payload.description,
          request.payload.category,
          request.auth.credentials,
          county,
          request.payload.lat,
          request.payload.lng,
      );
      return place;
    },
  },

  deleteAll: { 
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.placeStore.deleteAll();
      return {success: true};
    },
  },

  findByDonor: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const places = await db.placeStore.getPlaceByDonor(request.params.id); 
      return places;
    },
  },

};
