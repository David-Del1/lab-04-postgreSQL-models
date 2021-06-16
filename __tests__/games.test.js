import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game.js';

describe('game CRUD routes', () => {

  beforeEach(() => {
    return setup(pool);
  });
  it('should create a game via POST', async () => {
    const res = await request(app)
      .post('/api/v1/games')
      .send({ title: 'Nike', genre: 'white', release_year: 2007 });

    expect(res.body).toEqual({
      id: '1',
      title: 'Nike',
      genre: 'white',
      release_year: 2007
    });
  });

  it('Should read all games via GET', async () => {
    const game1 = await Game.insert({
      title: 'Reebok',
      genre: 'Black',
      release_year: 2007
    });

    const game2 = await Game.insert({
      title: 'New Balance',
      genre: 'white',
      release_year: 2010
    });

    const game3 = await Game.insert({
      title: 'Sketchers',
      genre: 'gray',
      release_year: 2010
    });

    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual([game1, game2, game3]);
  });

  it('Should read a single game by id via GET', async () => {
    const game = await Game.insert({
      title: 'Nike',
      genre: 'white',
      release_year: 2007
    });

    const res = await request(app).get(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
  });

  it('Should update a game via PUT', async () => {
    const game = await Game.insert({
      title: 'Nike',
      genre: 'white',
      release_year: 2007
    });

    game.genre = 'gray';

    const res = await await request(app).put(`/api/v1/games/${game.id}`).send(game);
    expect(res.body).toEqual(game);

  });

  it('Should delete a game via DELETE', async () => {
    const game = await Game.insert({
      title: 'Nike',
      genre: 'white',
      release_year: 2007
    });

    const res = await request(app).delete(`/api/v1/games/${game.id}`);
    expect(res.body).toEqual(game);

  });
});
