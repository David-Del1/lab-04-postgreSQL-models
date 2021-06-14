import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
      name: 'spot',
      type: 'chips',
      flavor: 'cheese'
    });


  });

  
});
