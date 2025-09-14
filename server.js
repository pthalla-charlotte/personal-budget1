const express = require('express');
const app = express();
const PORT = 4000;

const budget = {
    myBudget: [
        {
            title: 'Eat Out',
            budget: 45
        },
        {
            title: 'Rent',
            budget: 200
        },
        {
            title: 'Grocery',
            budget: 120
        },
    ]
};

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello world frp!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

