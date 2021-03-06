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

  static async readAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books'
    );
    return rows.map(row => new Book(row));
  }

  static async readById(id) {
    const { rows } = await pool.query(
      ` SELECT * FROM books
        WHERE id = $1`,
      [id]
    );
    return new Book(rows[0]);
  }

  static async update(book, id) {
    const { rows } = await pool.query(
      ` UPDATE books
        SET title = $1, genre = $2, pub_year = $3
        WHERE id = $4
        RETURNING *`,
      [book.title, book.genre, book.pub_year, id]
        
    );
    return new Book(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE from books
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    return new Book(rows[0]);
  }
}
