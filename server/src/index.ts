import 'dotenv-safe/config';
import express from 'express';
import { PORT, __prod__ } from './config/config';
import routes from './routes';
import logger from './common/logger';
import cors from 'cors';

const app = express();
if (!__prod__) {
  app.use(cors({ origin: `http://localhost:3000` }));
}
app.use(routes);
app
  .listen(PORT, () => logger.info(`server started on localhost:${PORT}`))
  .on('error', (e) => logger.error(e));
