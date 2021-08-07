import 'dotenv-safe/config';
import express from 'express';
import { PORT } from './config/config';
import routes from './routes';

const app = express();

app.use(routes);
app.listen(PORT, () => console.log(`server started on localhost:${PORT}`));
