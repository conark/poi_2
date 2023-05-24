import { userApi } from "./api/users-api.js";
import { placesApi } from "./api/places-api.js";
import { countiesApi } from "./api/counties-api.js";
import { reviewsApi } from "./api/reviews-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/places", config: placesApi.findAll },
  { method: "GET", path: "/api/places/{id}", config: placesApi.findOne },
  { method: "GET", path: "/api/counties/{id}/places", config: placesApi.findByCounty },
  { method: "GET", path: "/api/donors/{id}/places", config: placesApi.findByDonor },
  { method: "POST", path: "/api/counties/{id}/places", config: placesApi.makePlace },
  { method: "DELETE", path: "/api/places", config: placesApi.deleteAll },

  { method: "GET", path: "/api/counties", config: countiesApi.find },
  { method: "GET", path: "/api/counties/{id}", config: countiesApi.findOne },
  { method: "POST", path: "/api/counties", config: countiesApi.create },
  { method: "DELETE", path: "/api/counties/{id}", config: countiesApi.deleteOne },
  { method: "DELETE", path: "/api/counties", config: countiesApi.deleteAll },


  { method: "GET", path: "/api/reviews", config: reviewsApi.findAll },
  { method: "GET", path: "/api/reviews/{id}", config: reviewsApi.findOne },
  { method: "GET", path: "/api/places/{id}/reviews", config: reviewsApi.findByPlace },
  { method: "GET", path: "/api/donors/{id}/reviews", config: reviewsApi.findByDonor },
  { method: "POST", path: "/api/reviews", config: reviewsApi.addReview },
  { method: "DELETE", path: "/api/reviews", config: reviewsApi.deleteAll },


];

