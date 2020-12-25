import { router } from './routes';
import { connectPostgres } from './common/postgres';
import { response } from './common/response';

import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);
app.use(response);

const init = async () => {
  await connectPostgres();
  app.listen(port, () => {
    console.log('API Server is running on port ' + port);
  });
};

init();
