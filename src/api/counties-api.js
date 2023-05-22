import Boom from "@hapi/boom";
import { County } from "../models/mongo/county.js";

export const countiesApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const counties = await County.find();
      return counties;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const county = await County.findOne({ _id: request.params.id });
        if (!county) {
          return Boom.notFound("No County with this id");
        }
        return county;
      } catch (err) {
        return Boom.notFound("No County with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newCounty = new County(request.payload);
      const county = await newCounty.save();
      if (county) {
        return h.response(county).code(201);
      }
      return Boom.badImplementation("error creating county");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await County.remove({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const response = await County.deleteOne({ _id: request.params.id });
      if (response.deletedCount === 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};
