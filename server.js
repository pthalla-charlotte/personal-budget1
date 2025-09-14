const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;


app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello world this is Week04 of Exploring!');
});

app.get('/budget', (req, res) => {
  const filePath = path.join(__dirname, 'budget.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading budget.json:', err);
      return res.status(500).send('Error loading budget data');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

