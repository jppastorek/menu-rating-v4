import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
sqlite3.verbose();

export default class Ratings {
  constructor(db) {
    this.db = db;
  }

  async openDB() {
    return open({
      filename: `${this.db}`,
      driver: sqlite3.Database,
    });
  }

  async addRating(user_id, item_id, rating, comment, dateCreated) {
    let db = await this.openDB();

    //check and see if the rating exists in the db
    let ratingExists = await db.get(
      `
      SELECT *
      FROM ratings
      WHERE user_id = ${user_id} AND item_id = ${item_id};
      `
    );

    //if it doesn't exist, add a new rating
    if (!ratingExists) {
      var result = await db.run(
        `INSERT INTO ratings (user_id, item_id, rating, comment, dateCreated)
              VALUES ('${user_id}', '${item_id}', '${rating}', '${comment}', '${dateCreated}');`
      );
    } else {
      //log the error!
      console.error('You already rated this item!');
    }
    await db.close();
    return result;
  }

  async getRating(rating_id) {
    let db = await this.openDB();
    const result = await db.get(`
      SELECT *
      FROM ratings
      WHERE rating_id = ${rating_id};
    `);
    await db.close();
    return result;
  }

  async deleteRating(rating_id) {
    let db = await this.openDB();
    await db.run(`
      DELETE FROM ratings WHERE rating_id = '${rating_id}';
    `);
    await db.close();
  }

  //this should just create a whole new row so i have historical data
  async updateRating(rating_id, user_id, item_id, rating, comment, dateCreated) {
    let db = await this.openDB();
    let result = await db.exec(
      `UPDATE ratings
      SET rating = '${rating}', comment = '${comment}', dateCreated = '${dateCreated}'
      WHERE rating_id = '${rating_id}'
      `
    );
    await db.close();
    return result;
  }
}
