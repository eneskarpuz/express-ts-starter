import express from 'express';
import routes from './routes/index';
import { errorHandler, normalizeError } from './middlewares/errorHandler';
import morganHandler from './utils/morgan';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morganHandler);
app.use('/v1', routes);

app.use(errorHandler);
app.use(normalizeError);

export default app;