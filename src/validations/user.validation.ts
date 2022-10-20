import Joi from "joi";

const user = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(4).required().email(),
});

export default user;