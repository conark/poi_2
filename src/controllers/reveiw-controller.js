// import { db } from "../models/db.js";

// export const reviewsController = {
//   index: {
//     handler: async function (request, h) {
//       const loggedInUser = request.auth.credentials;
//       const reviews = await db.reviewStore.getPlaceReviewById(request.params.id);
//       return h.view("Review", { 
//         title: "Make a Review",
//         reviews: reviews,
//         user: loggedInUser,
//       }
//         );
//     },
//   },
//   reviewReport: {
//     handler: async function (request, h) {
//       const reviews = await db.reviewStore.getPlaceReviewById(request.params.id);
//       const count = reviews.length;
//       let average = 0;
      
//       reviews.forEach((review) => {
//         average += review.rate;
//       });
      
//       if (count > 0) {
//         // eslint-disable-next-line operator-assignment
//         average = average / count;
//       } else {
//         average = 0; 
//       }
//       return h.view("Review-Report", {
//         title: "Favorite Walk Trail",
//         reviews: reviews,
//         average: average,
//       });
//     },
//   },

//   addReview: {
//     handler: async function (request, h) {
//       const newReview = {
//         rate: request.payload.rate,
//         review: request.payload.review,
//         // img: request.payload.img,
//         password: request.payload.password,
//         admin: request.payload.admin
//       };
//       await db.reviewStore.addReview(newReview);
//       return h.redirect("/Report");
//     },
//   },
// }
import { db } from "../models/db.js";

export const reviewsController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const reviews = await db.reviewStore.getPlaceReviewById(request.params.placeid);
      return h.view("Review", { 
        title: "Make a Review",
        reviews: reviews,
        user: loggedInUser,
      });
    },
  },
  reviewReport: {
    handler: async function (request, h) {
      const reviews = await db.reviewStore.getPlaceReviewById(request.params.placeid);
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
      const place = await db.placeStore.getPlaceById(request.params.id);
      
      const newReview = {
        rate: request.payload.rate,
        review: request.payload.review,
        donor: loggedInUser._id,
        place: place._id,
      };
      await db.reviewStore.addReview(newReview);
      return h.redirect(`/editplace/${place._id}`);
    },
  },
};