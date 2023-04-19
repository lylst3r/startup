const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const itemCollection = client.db('startup').collection('item');

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

module.exports = {addItem, getItems};