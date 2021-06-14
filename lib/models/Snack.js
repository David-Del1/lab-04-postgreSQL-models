import pool from '../utils/pool';

export default class Snack {
  id;
  name;
  type;
  flavor;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.flavor = row.flavor;
  }

  static async insert({ name, type, flavor }) {
    const { rows } = await pool.query(
      ` INSERT INTO snacks (name, type, flavor)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, type, flavor]
    );
    return new Snack(rows[0]);
  }

  static async readAll() {
    const { rows } = await pool.query(
      'SELECT * FROM snacks'
    );
    return rows.map(row => new Snack(row));
  }

  static async readById(id) {
    const { rows } = await pool.query(
      ` SELECT * FROM snacks
        WHERE id = $1`,
      [id]
    );
    return new Snack(rows[0]);
  }

  static async update(snack, id) {
    const { rows } = await pool.query(
      ` UPDATE snacks
        SET name = $1, type = $2, flavor = $3
        WHERE id = $4
        RETURNING *`,
      [snack.name, snack.type, snack.flavor, id]
        
    );
    return new Snack(rows[0]);
  }
}
