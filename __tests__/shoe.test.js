import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Shoe from '../lib/models/Shoe.js';

describe('Shoe CRUD routes', () => {

  beforeEach(() => {
    return setup(pool);
  });
  it('should create a shoe via POST', async () => {
    const res = await request(app)
      .post('/api/v1/shoes')
      .send({ name: 'Nike', color: 'white', isStylish: true });

    expect(res.body).toEqual({
      id: '1',
      name: 'Nike',
      color: 'white',
      isStylish: true
    });
  });

  it('Should read all shoes via GET', async () => {
    const shoe1 = await Shoe.insert({
      name: 'Reebok',
      color: 'Black',
      isStylish: true
    });

    const shoe2 = await Shoe.insert({
      name: 'New Balance',
      color: 'white',
      isStylish: false
    });

    const shoe3 = await Shoe.insert({
      name: 'Sketchers',
      color: 'gray',
      isStylish: false
    });

    const res = await request(app).get('/api/v1/shoes');
    expect(res.body).toEqual([shoe1, shoe2, shoe3]);
  });

  it('Should read a single shoe by id via GET', async () => {
    const shoe = await Shoe.insert({
      name: 'Nike',
      color: 'white',
      isStylish: true
    });

    const res = await request(app).get(`/api/v1/shoes/${shoe.id}`);

    expect(res.body).toEqual(shoe);
  });

  it('Should update a shoe via PUT', async () => {
    const shoe = await Shoe.insert({
      name: 'Nike',
      color: 'white',
      isStylish: true
    });

    shoe.color = 'gray';

    const res = await await request(app).put(`/api/v1/shoes/${shoe.id}`).send(shoe);
    expect(res.body).toEqual(shoe);

  });

  it('Should delete a shoe via DELETE', async () => {
    const shoe = await Shoe.insert({
      name: 'Nike',
      color: 'white',
      isStylish: true
    });

    const res = await request(app).delete(`/api/v1/shoes/${shoe.id}`);
    expect(res.body).toEqual(shoe);

  });


});
