import { Request, Response } from 'express';
import morgan from 'morgan';
import logger from './logger';

morgan.token('errorMessage', (req:Request, res:Response) => res.locals.errorMessage || '');

const morganHandler = morgan('tiny - errorMessage: :errorMessage', {
    stream: { write: (message) => logger.info(message.trim()) },
});

export default morganHandler;
