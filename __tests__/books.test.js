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

  it('Should read all Books via GET', async () => {
    const Book1 = await Book.insert({
      title: 'Reebok',
      genre: 'Black',
      pub_year: 1200
    });

    const Book2 = await Book.insert({
      title: 'New Balance',
      genre: 'white',
      pub_year: 1300
    });

    const Book3 = await Book.insert({
      title: 'Sketchers',
      genre: 'gray',
      pub_year: 1500
    });

    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual([Book1, Book2, Book3]);
  });

  it('Should read a single Book by id via GET', async () => {
    const book = await Book.insert({
      title: 'To Kill A Mockingbird',
      genre: 'white',
      pub_year: 1962
    });

    const res = await request(app).get(`/api/v1/books/${book.id}`);

    expect(res.body).toEqual(book);
  });

  it('Should update a book via PUT', async () => {
    const book = await Book.insert({
      title: 'Nike',
      genre: 'fantasy',
      pub_year: 2000
    });

    book.genre = 'non-fiction';

    const res = await await request(app).put(`/api/v1/books/${book.id}`).send(book);
    expect(res.body).toEqual(book);

  });

  it('Should delete a book via DELETE', async () => {
    const book = await Book.insert({
      title: 'Nike',
      genre: 'white',
      pub_year: 2002
    });

    const res = await request(app).delete(`/api/v1/books/${book.id}`);
    expect(res.body).toEqual(book);

  });

});
