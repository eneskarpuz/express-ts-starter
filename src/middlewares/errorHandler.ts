import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import { prodResponse } from '../config/constants';
import BaseError from '../utils/BaseError';
import httpStatusCodes from '../utils/httpStatusCodes';
import logger from '../utils/logger';

interface Error {
  name: string;
  message: string;
  stack?: string;
  statusCode?: number;
}

const normalizeError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  if (!(error instanceof BaseError)) {
    const statusCode = error.statusCode || httpStatusCodes.INTERNAL_SERVER;
    const message = error.message || 'Internal Server Error';
    error = new BaseError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  const devResponse = {
    code: statusCode,
    message: message,
    stack: err.stack,
  };
  const response = config.NODE_ENV === 'production' ? prodResponse : devResponse;

  if (config.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.locals.errorMessage = err.message;
  res.status(statusCode).send(response);
};

export { errorHandler, normalizeError };
