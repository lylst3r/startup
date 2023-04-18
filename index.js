const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/items', (_req, res) => {
    res.send(items);
  });

  apiRouter.post('/item', (req, res) => {
    items = updateItems(req.body, items);
    res.send(items);
  });

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  let items = [];
  function updateItems(newItem, items) {
    items.push(newItem);
    return items;
  }