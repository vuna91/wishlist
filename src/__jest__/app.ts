import express from 'express';
import { router } from '../routes';
import bodyParser from 'body-parser';
import { response } from '../common/response';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(router);
app.use(response);

export default app;
