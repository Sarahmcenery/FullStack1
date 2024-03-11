// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

export const UserSpec = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

export const BridgeSpec = {
    bridgename: Joi.string().required(),
    location: Joi.string().required(),
    bridgetype: Joi.string().required(),
  };
  
export const BridgelistSpec = {
    title: Joi.string().required(),
  };