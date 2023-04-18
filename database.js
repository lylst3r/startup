const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('startup').collection('item');

function addItem(item) {
  scoreCollection.insertOne(item);
}

function getItems() {
  const query = {item: {$gt: 0}};
  const options = {
    sort: {item: -1}
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {addItem, getItems};