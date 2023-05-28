import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
  rate: Number,
  review: String,
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