import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const reviewsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const reviews = await db.reviewStore.getAll();
      return reviews;
    },
  },
  // findByPlace: {
  //   auth: {
  //     strategy: "jwt",
  //   },
  //   handler: async function (request, h) {
  //     const reviews = await db.reviewStore.getPlaceReviewById(request.params.id);
  //     return reviews;
  //   },
  // },
  findByPlace: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const reviews = await db.reviewStore.getPlaceReviewById(request.params.id);
      return reviews;
    },
  },
  
  findByDonor: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const reviews = await db.reviewStore.getDonorReviewById(request.params.id);
      return reviews;
    },
  },




  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const review = await db.reviewStore.findById(request.params.id);
      return review;
    },
  },

 
  addReview: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const place = await db.placeStore.findById(request.params.id);
      if (!place) {
        return Boom.notFound("No Review with this id");
      }
      const review = await db.reviewStore.addReview(
        request.payload.rate,
        request.payload.review,
        request.auth.credentials,
        place,
      );
      return review;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.reviewStore.deleteAll();
      return { success: true };
    },
  },
};

