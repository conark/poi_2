import { Review } from "./review.js";

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
  async addReview(rate,review, img) {
    const newReview = new Review({
      rate,
      review,
      // img,
      donor: donor._id,
      place: donor._id,
    });
    await newReview.save();
    return newReview;
  },
};
