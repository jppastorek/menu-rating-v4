import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
sqlite3.verbose();

export default class Restaurant {
  constructor(db) {
    this.db = db;
  }

  async openDB() {
    return open({
      filename: `${this.db}`,
      driver: sqlite3.Database,
    });
  }

  async addNewRestaurant(
    restaurant_name,
    restaurant_location,
    phone,
    website,
    cuisine,
    restaurant_hours,
    established,
    rating,
    reviews,
    delivers,
    atmosphere,
    reservations
  ) {
    let db = await this.openDB();

    //check and see if the restaurant exists in the db
    let restaurantExists = await db.get(
      `
          SELECT *
          FROM restaurants
          WHERE restaurant_name = ${restaurant_name} AND restaurant_location = ${restaurant_location};
          `
    );

    //if it doesn't exist, add a new rating
    if (!restaurantExists) {
      await db.exec(
        `INSERT INTO restaurants (restaurant_name,
            restaurant_location,
            phone,
            website,
            cuisine,
            restaurant_hours,
            established,
            rating,
            reviews,
            delivers,
            atmosphere,
            reservations)
                      VALUES ('${restaurant_name}', '${restaurant_location}', '${phone}', '${website}', '${cuisine}', '${restaurant_hours}', '${established}, '${rating}', '${reviews}', 
                      ${delivers}', '${atmosphere}', '${reservations}');`
      );
    } else {
      //log the error!
      console.error('This restaurant already exists!');
    }

    await db.close();
  }

  async updateRestaurant(
    restaurant_id,
    restaurant_name,
    restaurant_location,
    phone,
    website,
    cuisine,
    restaurant_hours,
    established,
    rating,
    reviews,
    delivers,
    atmosphere,
    reservations
  ) {
    let db = await this.openDB();
    let result = await db.exec(
      `UPDATE restaurants
        SET restaurant_name = '${restaurant_name}', restaurant_location = '${restaurant_location}', phone = '${phone}', website = '${website}', cuisine = '${cuisine}', restaurant_hours = '${restaurant_hours}', established = '${established}, rating = '${rating}', reviews = '${reviews}', delivers = ${delivers}', atomsphere = '${atmosphere}', reservations = '${reservations}'
        WHERE restaurant_id = '${restaurant_id}'
        `
    );
    await db.close();
    return result;
  }

  async getRestaurant(restaurant_id) {
    let db = await this.openDB();
    const result = await db.get(`
      SELECT *
      FROM restaurants
      WHERE restaurant_id = '${restaurant_id}';
    `);
    await db.close();
    return result;
  }

  async deleteRestaurant(restaurant_id) {
    let db = await this.openDB();
    await db.run(`
      DELETE FROM restaurants WHERE restaurant_id = '${restaurant_id}';
    `);
    await db.close();
  }
}
