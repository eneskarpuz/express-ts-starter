import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

interface configTypes {
  NODE_ENV?: string;
  PORT?: string;
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: configTypes = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
};
