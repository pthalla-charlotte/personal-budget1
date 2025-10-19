const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('public'));

//Step 1: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myBudgetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Step 2: Define schema (structure of your data)
const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-Fa-f]{6}$/  // must be 6-digit hex like "#FF5733"
  }
});

//Step 3: Create model (collection in MongoDB)
const Budget = mongoose.model('Budget', budgetSchema);

// Step 4: Routes

// Test route (still there)
app.get('/hello', (req, res) => {
  res.send('Hello world this is Quiz08 of Exploring!');
});

// GET: Fetch all data
app.get('/budget', async (req, res) => {
  try {
    const data = await Budget.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// Add new data (POST)
app.post('/budget', async (req, res) => {
  try {
    const newEntry = new Budget(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
