import { router } from '../routes';
import { response } from '../common/response';

import express from 'express';
import bodyParser from 'body-parser';
import jwtUtil from '../common/jwtUtil';

const app: express.Application = express();
app.use(bodyParser.json());
app.use(jwtUtil.parserToken);
app.use(router);
app.use(response);

export default app;
