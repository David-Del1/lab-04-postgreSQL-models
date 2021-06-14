import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from './controllers/dogs.js';
import shoeController from './controllers/shoes.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(shoeController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
