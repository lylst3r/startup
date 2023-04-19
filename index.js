const express = require('express');
const app = express();
const DB = require('./database.js');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/items', async (_req, res) => {
    const items = await DB.getItems();
    res.send(items);
  });

apiRouter.post('/item', async (req, res) => {
    DB.addItem(req.body);
    const items = await DB.getItems();
    res.send(items);
  });

  /*
  apiRouter.update('/item', async (req, res) => {
    DB.delete(req.body);
    const items = await DB.getItems();
    res.send(items);
  }); */

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  /*
  let items = [];
  function updateItems(newItem, items) {
    items.push(newItem);
    return items;
  } */