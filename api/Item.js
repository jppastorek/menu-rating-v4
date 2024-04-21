import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
sqlite3.verbose();

export default class Item {
  constructor(db) {
    this.db = db;
  }

  async openDB() {
    return open({
      filename: `${this.db}`,
      driver: sqlite3.Database,
    });
  }

  async addItem(item_name, restaurant_id, price, item_description) {
    let db = await this.openDB();
    //check and see if the item exists in the db
    let itemExists = await db.get(
      `
        SELECT *
        FROM items
        WHERE item_name = '${item_name} AND restaurant_id = '${restaurant_id}';
        `
    );

    //if it doesn't exist, add a new item
    if (!itemExists) {
      await db.exec(
        `INSERT INTO items (item_name, restaurant_id, price, item_description)
                VALUES ('${item_name}', '${restaurant_id}', '${price}', '${item_description}');`
      );
    } else {
      //log the error!
      console.error('You already rated this item!');
    }

    await db.close();
  }

  async getItem(item_id) {
    let db = await this.openDB();
    const result = await db.get(`
      SELECT *
      FROM items
      WHERE item_id = ${item_id};
    `);
    await db.close();
    return result;
  }

  async searchItems(value) {
    let db = await this.openDB();
    const result = await db.all(`
    SELECT items.*, AVG(ratings.rating) as avg_rating, COUNT(ratings.rating) as num_of_ratings, restaurants.restaurant_name
FROM items
LEFT JOIN ratings ON ratings.item_id=items.item_id
LEFT JOIN restaurants ON restaurants.restaurant_id=items.restaurant_id
WHERE items.item_description LIKE '%${value}%' OR items.item_name LIKE '%${value}%' OR restaurants.restaurant_name LIKE '%${value}%'
GROUP BY items.item_id

    
    `);
    await db.close();
    return result;
  }

  async updateItem(item_id, item_name, restaurant_id, price, item_description) {
    let db = await this.openDB();
    const result = await db.run(`
      UPDATE items
      SET item_name = '${item_name}', restaurant_id = '${restaurant_id}', price = '${price}', item_description = '${item_description}'
      WHERE item_id = '${item_id};
    `);
    await db.close();
    return result;
  }

  async deleteItem(item_id) {
    let db = await this.openDB();
    await db.run(`
      DELETE FROM items WHERE item_id = '${item_id}';
    `);
    await db.close();
  }

  async getAverageRating(item_id) {
    let db = await this.openDB();
    let result = await db.get(`
    SELECT AVG(rating)
    FROM ratings
    WHERE item_id = '${item_id}';
    `);
    await db.close();
    return result;
  }
}
