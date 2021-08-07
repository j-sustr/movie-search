import 'dotenv-safe/config';
import express from 'express';
import { PORT } from './config/config';
import routes from './routes';
import logger from './common/logger';

const app = express();

app.use(routes);
app
  .listen(PORT, () => logger.info(`server started on localhost:${PORT}`))
  .on('error', (e) => logger.error(e));
