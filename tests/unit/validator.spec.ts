import httpMocks from 'node-mocks-http';
import Joi from 'joi';
import validator from '../../src/middlewares/validator';
import { wrongbody, correctbody } from '../fixtures/request.fixture';

describe('Validation middleware', () => {
  test('Should validate correctly', () => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(4).required().email(),
    });
    const res = httpMocks.createResponse();
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/v1',
      body: correctbody,
    });
    const next = jest.fn();

    validator(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('Validation should fail and return error message correctly', () => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().min(4).required().email(),
    });
    const res = httpMocks.createResponse();
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/v1',
      body: wrongbody,
    });
    const next = jest.fn();
    validator(schema)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
