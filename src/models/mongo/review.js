import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = Schema({
  rate: Number,
  review: String,
  // img: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
  },

});

export const Review = Mongoose.model("Review", reviewSchema);