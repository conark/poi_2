import { County } from "./county.js";

export const countyMongoStore = {
  async getAllCounties() {
    const counties = await County.find().lean();
    return counties;
  },

  async findById(id) {
    const county = await County.findOne({ _id: id }).lean();
    return county;
  },

  async getUserCounties(id) {
    const county = await County.find({ userid: id }).lean();
    return county;
  },


  async getCountyById(id) {
    if (id) {
      const county = await County.findOne({ _id: id }).lean();
      if (county) {
        county.places = await placeMongoStore.getPlacesByCountyId(county._id);
      }
      return county;
    }
    return null;
  },

  async findByName(countyName) {// lastName, countyName) {
    const county = await County.findOne({
      // lastName,
      countyName,
    });
    return county;
  },
  async deleteCountyById(id) {
    try {
      await County.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },
};
