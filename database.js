const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('simon').collection('user');
const itemCollection = client.db('startup').collection('item');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addItem(item) {
  itemCollection.insertOne(item);
}

function getItems() {
//   const query = {item: {$all}};
//   const options = {
//     sort: {item: -1}
//   };
//   const cursor = itemCollection.find(query, options);
//   return cursor.toArray(); 
  return itemCollection.toArray();
}

/*
function printItems() {
var arr = itemCollection.toArray();
    for (i=0; i < arr.length; i++) {
        console.log(arr[i]);
    }
} */

module.exports = {getUser, getUserByToken, createUser, addItem, getItems};