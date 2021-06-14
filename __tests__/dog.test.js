import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';
// import Dog from '../lib/models/Dog.js';

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'spot', age: 5, weight: '20 lbs' });

    expect(res.body).toEqual({
      id: '1',
      name: 'spot',
      age: 5,
      weight: '20 lbs',
    });

  });

  it('reads all dogs via GET', async () => {
    const spot = await Dog.insert({
      name: 'spot',
      age: 10,
      weight: '20lbs'
    });
    const rover = await Dog.insert({
      name: 'rover',
      age: 4,
      weight: '30lbs'
    });
    const bingo = await Dog.insert({
      name: 'bingo',
      age: 6,
      weight: '10lbs'
    });
    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual([spot, rover, bingo]);
  });

  it('read a single dog by id via GET', async () => {
    const dog = await Dog.insert({
      name: 'fred',
      age: 10,
      weight: '1 lbs'
    });

    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  it('Should update a single dog via PUT', async () => {
    const dog = await Dog.insert({
      name: 'fred',
      age: 10,
      weight: '1 lbs'
    });

    dog.name = 'Gazeebo';

    const res = await request(app).put(`/api/v1/dogs/${dog.id}`)
      .send(dog);
    
    expect(res.body).toEqual(dog);
  });

  it('Deletes a dog via DELETE', async () => {
    const dog = await Dog.insert({
      name: 'Mad Max',
      age: 4,
      weight: '10 lbs'
    });

    const res = await request(app).delete(`/api/v1/dogs/${dog.id}`)
      .send(dog);
    expect(res.body).toEqual(dog);
  });

  
});
