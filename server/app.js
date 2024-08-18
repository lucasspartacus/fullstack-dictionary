const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const wordRoutes = require('./routes/dictionary');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/words', wordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
