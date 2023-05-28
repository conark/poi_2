import { Place } from "./place.js";
// eslint-disable-next-line import/no-cycle
import { reviewMongoStore } from "./review-mongo-store.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().populate("donor").populate("county").lean();
    return places;
  },

  async getPlacesByCounty(id) {
    const places = await Place.find({ county: id });
    return places;
  },
   async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({_id: id }).lean();
      return place;
    }
    return null;
  },

  async findByName(placename) {
    const place = await Place.findOne({
      placename,
    });
    return place;
  },


  async getPlaceByDonor(id) {
    if (id) {
      const places = await Place.find({ donor: id }).populate("donor").populate("county").lean();;
      return places;
    }
    return null;
  },

  async place(placename,description, category, donor, county, lat, lng) {
    const newPlace = new Place({
      placename,
      category,
      description,
      donor: donor._id,
      county: county._id,
      lat,
      lng,
    });
    await newPlace.save();
    return newPlace;
  },

  async deleteAll() {
    await Place.deleteMany({});
  },

  async updatePlace(id, updatedPlace) {
    const place = await Place.findOne({ _id: id });
    place.category = updatedPlace.category;
    place.placename = updatedPlace.placename;
    place.description = updatedPlace.description;
    place.lat = updatedPlace.lat;
    place.lng = updatedPlace.lng;
    await place.save();
  },
  // async getReviewById(id) {
  //   if (id) {
  //     const place = await Place.find({ _id: id }).lean();
  //     if (place) {
  //       place.reviews = await reviewMongoStore.getReviewsByPlace(place._id);
  //     }
  //     return place;
  //   }
  //   return null;
  // },
  async getReviewById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).populate("reviews").lean();
      return place;
    }
    return null;
  },
  
};
