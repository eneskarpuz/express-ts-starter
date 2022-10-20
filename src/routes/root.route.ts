import { Router} from 'express';
import validator from '../middlewares/validator';
import user from '../validations/user.validation';
import sampleController from '../controllers/sample.controller';

const root = Router();

root
  .route('/')
  .get(sampleController.greetings)
  .post(validator(user), sampleController.greetings);

export default root;
