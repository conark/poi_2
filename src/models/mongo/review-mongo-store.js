import { Review } from "./review.js";
// eslint-disable-next-line import/no-cycle
import { placeMongoStore } from "./place-mongo-store.js";


export const reviewMongoStore = {
  async getAllReviews() {
    // const reviews = await Review.find().lean();
    const reviews = await Review.find().populate("donor").populate("place").lean();
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


  async getReviewsByPlace(id) {
    const reviews = await Review.find({ place: id }).populate("donor").populate("place").lean();
    return reviews;
  },

  async getPlaceReviewById(id) {
    if (id) {
      const review = await Review.findOne({ _id: id }).populate("donor").populate("place").lean();
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
      donor,
      place,
    });
    await newReview.save();
    return newReview;
  },
};
