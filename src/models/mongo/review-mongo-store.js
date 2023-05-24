import { Review } from "./review.js";
import { placeMongoStore } from "./place-mongo-store.js";


export const reviewMongoStore = {
  async getAllReviews() {
    const reviews = await Review.find().lean();
    return reviews;
  },

  async findById(id) {
    const review = await Review.findOne({ _id: id }).lean();
    return review;
  },

  async getUserReviews(id) {
    const review = await Review.find({ userid: id }).lean();
    return review;
  },


  async getPlaceReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).lean();
      if (review) {
        review.places = await placeMongoStore.getPlacesByReviewId(review._id);
      }
      return review;
    }
    return null;
  },
  async addReview(rate,review, donor, place) {
    const newReview = new Review({
      rate,
      review,
      donor: donor._id,
      place: place._id,
    });
    await newReview.save();
    return newReview;
  },
};
