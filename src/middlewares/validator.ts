import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import BaseError from '../utils/BaseError';
import httpStatusCodes from '../utils/httpStatusCodes';

const findValidReqProperty = (req: Request) => {
  const properties = [req.params, req.body, req.query];
  const valid = properties.find((property) => Object.keys(property).length !== 0);
  return valid;
};

const validator = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validReqProperty = findValidReqProperty(req);
  const validation = Joi.compile(schema).validate(validReqProperty);

  if (validation.error) {
    const errorMessage = validation.error.details.shift().message;
    next(new BaseError(httpStatusCodes.BAD_REQUEST, errorMessage));
  }
  
  Object.assign(req, validation.value);
  next();
};

export default validator;
