import BaseError from '../../src/utils/BaseError';
import httpStatusCodes from '../../src/utils/httpStatusCodes';
import { errorHandler } from '../../src/middlewares/errorHandler';
import httpMocks from 'node-mocks-http';

describe('Error handler middleware', () => {
  test('Should send proper error response', () => {
    const error = new BaseError(httpStatusCodes.BAD_REQUEST, 'Bad Request');
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const sendSpy = jest.spyOn(res, 'send');

    errorHandler(error, httpMocks.createRequest(), res, next);

    var json = res._getData();
    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({ code: error.statusCode, message: error.message, stack: error.stack }),
    );
    expect(json).toEqual({ code: error.statusCode, message: error.message, stack: error.stack });
    expect(json.code).toBe(error.statusCode);
  });
});
