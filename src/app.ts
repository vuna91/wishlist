import express from 'express';
import bodyParser from 'body-parser';
import postgres from './common/postgres';
import { router } from './routes';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);

const init = async () => {
  await postgres.connect();
  app.listen(port, () => {
    console.log('API Server is running on port ' + port);
  });
};

init();
