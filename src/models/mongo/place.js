import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  placename: String,
  category: String,
  description: String,
  lat: String,
  lng: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  county: {
    type: Schema.Types.ObjectId,
    ref: "County",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
