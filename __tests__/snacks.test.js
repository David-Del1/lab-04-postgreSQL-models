import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Snack from '../lib/models/Snack.js';

describe('Snack CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Should insert a new snack via POST', async () => {
    const res = await request(app)
      .post('/api/v1/snacks')
      .send({ name: 'cheetos', type: 'chips', flavor: 'cheese' });

    expect(res.body).toEqual({
      id: '1',
      name: 'cheetos',
      type: 'chips',
      flavor: 'cheese'
    });
  });

  it('Should read all snacks via GET', async () => {

    const snack1 = await Snack.insert({
      name: 'Carrots',
      type: 'veggie',
      flavor: 'beta cerotene'
    });
    const snack2 = await Snack.insert({
      name: 'Jelly bean',
      type: 'candy',
      flavor: 'grass'
    });
    const snack3 = await Snack.insert({
      name: 'Kettle corn',
      type: 'popcorn',
      flavor: 'caramel'
    });

    const res = await request(app)
      .get('/api/v1/snacks');

    expect(res.body).toEqual([snack1, snack2, snack3]);
  });

  it('Should read a single snack via GET', async () => {
    const snack = await Snack.insert({
      name: 'strawberry',
      type: 'fruit',
      flavor: 'straw'
    });

    const res = await request(app).get(`/api/v1/snacks/${snack.id}`);

    expect(res.body).toEqual(snack);

  });

  it('Should update a snack via PUT', async () => {
    const snack = await Snack.insert({
      name: 'fritos',
      type: 'chips',
      flavor: 'chippy'
    });

    snack.name = 'gray';

    const res = await await request(app).put(`/api/v1/snacks/${snack.id}`).send(snack);
    expect(res.body).toEqual(snack);

  });

  it('Should delete a snack via DELETE', async () => {
    const snack = await Snack.insert({
      name: 'peanut butter',
      type: 'spread',
      flavor: 'peanut-y'
    });

    const res = await request(app).delete(`/api/v1/snacks/${snack.id}`);
    expect(res.body).toEqual(snack);

  });

  
});
