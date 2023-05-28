import { db } from "../models/db.js";

export const reviewsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const places = await db.placeStore.getAllPlaces();
      // const place = await db.placeStore.getPlaceById(request.params.placeid);
      // const place = await db.reviewStore.getPlaceReviewById(request.params.placeid);
      
      const reviews = await db.reviewStore.getAllReviews();
      const viewData = {
        title: "Make a Review",
        reviews: reviews,
        places: places,
        user: loggedInUser,
      }
      return h.view("review", viewData); 

    },
  },
  reviewReport: {
    handler: async function (request, h) {
      const reviews = await db.reviewStore.getReviewsByPlaceId(request.params.placeid);
      const count = reviews.length;
      let average = 0;
      
      reviews.forEach((review) => {
        average += review.rate;
      });
      
      if (count > 0) {
        average /= count;
      } else {
        average = 0; 
      }
      return h.view("Review-Report", {
        title: "Favorite Walk Trail",
        reviews: reviews,
        average: average,
      });
    },
  },

  addReview: {
    handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const rawPlace = request.payload.place.split(",");
        const place = await db.placeStore.findByName(rawPlace[0], rawPlace[1]);
        await db.reviewStore.addReview(
          request.payload.rate, 
          request.payload.review,
          loggedInUser, 
          place._id
          );
        return h.redirect("/review");
      }
  }
};

