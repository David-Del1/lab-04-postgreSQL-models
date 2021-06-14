import pool from '../utils/pool';

export default class Book {
  id;
  title;
  genre;
  pub_year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.pub_year = row.pub_year;
  }

  static async insert({ title, genre, pub_year }) {
    const { rows } = await pool.query(
      ` INSERT INTO books (title, genre, pub_year)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [title, genre, pub_year]
    );
    return new Book(rows[0]);
  }
}
