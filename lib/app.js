import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from './controllers/dogs.js';
import shoeController from './controllers/shoes.js';
import snackController from './controllers/snacks.js';
import bookController from './controllers/books.js';
import gameController from './controllers/games.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(shoeController);
app.use(snackController);
app.use(bookController);
app.use(gameController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
