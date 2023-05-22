
import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  admin: Joi.boolean().allow("").optional().example(true),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlaceSpec = Joi.object()
  .keys({
    category: Joi.string().required().example("River side"),
    placename: Joi.string().required().example("Gougane Barra"),
    description: Joi.string().required().example("Forest Park"),
    lat: Joi.number().allow("").optional().example(12),
    lng: Joi.number().allow("").optional().example(12),
    countyid: IdSpec,
  })
  .label("Place");

export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacePlus");

export const PlaceArraySpec = Joi.array().items(PlaceSpecPlus).label("PlaceArray");

export const CountySpec = Joi.object()
  .keys({
    countyname: Joi.string().required().example("Cork"),
    userid: IdSpec,
    places: PlaceArraySpec,
  })
  .label("County");

export const CountySpecPlus = CountySpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CountyPlus");

export const CountyArraySpec = Joi.array().items(CountySpecPlus).label("CountyArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
