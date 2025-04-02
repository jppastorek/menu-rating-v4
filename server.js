import User from './api/User.js';
import Ratings from './api/Rating.js';
import Item from './api/Item.js';
import express from 'express';
import cors from 'cors';
const port = process.env.port || 5001;
const db = './restaurant.db';
// const db = "C:/Users/jp/WebDev/menu-rating/restaurant.db";
// const db = process.env.DATABASE_PATH || "C:/Users/jp/WebDev/menu-rating/restaurant.db";
const userController = new User(db);
const ratingController = new Ratings(db);
const itemController = new Item(db);
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
const jsonParser = bodyParser.json();
const index = '/home/jp/WebDev/mantine-test/index.html';
app.use(express.static('/home/jp/WebDev/mantine-test'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(index);
});

//-----------------------------------USER---------------------------------

//GET USER
app.get('/api/user/:id', async (req, res) => {
  res.send(await userController.getUser(req.params['id']));
});

//POST NEW USER
app.post('/api/user', jsonParser, async (req, res) => {
  console.log(`Adding ${req.body.first_name}`);

  let id = await userController.addNewUser(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password,
    req.body.residence
  );
  res.send({
    status: `Successfully added ${req.body.first_name} ${
      req.body.last_name
    } at ID ${(await id).lastID}`,
  });
});

//USER LOG IN
app.post('/api/login', async (req, res) => {
  let user = await userController.login(req.body.email, req.body.password);
  user ? console.log('Login success!') : console.log('Try a different email or password.');
  res.send(user);
  // if (user) return user;
});

app.post('/api/user/:id/generateCode', async (req, res) => {
  let code = await userController.generateCode(req.params['id']);
  console.log(code);
  res.send({ code: code }); //how does the user see the code?
});

//USER VALIDATE EMAIL
app.post('/api/user/:id/validate', async (req, res) => {
  //some code
  let validated = await userController.login(req.body.code);
  validated ? res.send('ok') : res.send('not ok');
  return res.status;
});

//DELETE USER
app.delete('/api/user/:id', async (req, res) => {
  res.send(await userController.deleteUser(req.params['id']));
});

//------------------------------------ITEM-------------------------------
app.get('/api/item/:id', async (req, res) => {
  res.send(await itemController.getItem(req.params['id']));
});

app.get('/api/search/item/:value', async (req, res) => {
  let result = await itemController.searchItems(req.params['value']);
  res.send(result);
});

//------------------------------------RATING-----------------------------

//GET RATING
// app.get("/api/rating/:id", async (req, res) => {
//   res.send(await ratingController.getRating(req.params["id"]));
// });

//POST RATING
app.post('/api/item/:id/rate', jsonParser, async (req, res) => {
  let date = new Date();
  let id = ratingController.addRating(
    req.body.user_id,
    req.params['id'],
    req.body.rating,
    req.body.comment,
    date
  );
  res.send(`Successfully added rating at ${date}.`);
});

//DELETE RATING
app.delete('/api/rating/:id', async (req, res) => {
  res.send(await ratingController.deleteRating(req.params['id']));
});

//-----------------------------------LISTEN------------------------------

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
