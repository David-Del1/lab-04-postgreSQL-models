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
}
