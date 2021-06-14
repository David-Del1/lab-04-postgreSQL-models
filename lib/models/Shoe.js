import pool from '../utils/pool';

export default class Shoe {
  id;
  name;
  color;
  isStylish;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.isStylish = row.is_stylish;
  }

  static async insert({ name, color, isStylish }) {

    const { rows } = await pool.query(
      ` INSERT INTO shoes (name, color, is_stylish)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, color, isStylish]
    );

    return new Shoe(rows[0]);
  }

  static async readAll() {
    const { rows } = await pool.query(
      'SELECT * FROM shoes'
    );
    return rows.map(row => new Shoe(row));
  }

  static async readById(id) {
    const { rows } = await pool.query(
      ` SELECT * FROM shoes
        WHERE id = $1`,
      [id]
    );
    return new Shoe(rows[0]);
  }

  static async update(shoe, id) {
    const { rows } = await pool.query(
      ` UPDATE shoes
        SET name = $1, color = $2, is_stylish = $3
        WHERE id = $4
        RETURNING *`,
      [shoe.name, shoe.color, shoe.isStylish, id]
        
    );
    return new Shoe(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE from shoes
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    return new Shoe(rows[0]);
  }


}

