import pool from '../utils/pool';

export default class Game {
  id;
  title;
  genre;
  release_year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.release_year = row.release_year;
  }

  static async insert({ title, genre, release_year }) {

    const { rows } = await pool.query(
      ` INSERT INTO games (title, genre, release_year)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [title, genre, release_year]
    );

    return new Game(rows[0]);
  }

  static async readAll() {
    const { rows } = await pool.query(
      'SELECT * FROM games'
    );
    return rows.map(row => new Game(row));
  }

  static async readById(id) {
    const { rows } = await pool.query(
      ` SELECT * FROM games
        WHERE id = $1`,
      [id]
    );
    return new Game(rows[0]);
  }

  static async update(game, id) {
    const { rows } = await pool.query(
      ` UPDATE games
        SET title = $1, genre = $2, release_year = $3
        WHERE id = $4
        RETURNING *`,
      [game.title, game.genre, game.release_year, id]
        
    );
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE from games
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    return new Game(rows[0]);
  }
}
