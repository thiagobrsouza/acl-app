import 'express-async-errors'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';
import { handleError } from './middlewares/handleError';

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use(routes);

app.use(handleError);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});