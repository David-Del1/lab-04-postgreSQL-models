import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Book from '../lib/models/Book.js';

describe('Book CRUD routes', () => {

  beforeEach(() => {
    return setup(pool);
  });
  it('should create a book via POST', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({ title: 'A Strange New Land', genre: 'fiction', pub_year: 1982 });

    expect(res.body).toEqual({
      id: '1',
      title: 'A Strange New Land',
      genre: 'fiction',
      pub_year: 1982
    });
  });

});
