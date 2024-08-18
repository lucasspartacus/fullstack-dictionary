const express = require('express');
const axios = require('axios');
const Word = require('../models/word');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Search word and get definition
router.get('/search/:term', authMiddleware, async (req, res) => {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.term}`);
    const wordData = response.data[0];
    const definition = wordData.meanings[0]?.definitions[0]?.definition || 'No definition found';

    // Save or update word in the database
    let word = await Word.findOne({ term: req.params.term, userId: req.userId });
    if (!word) {
      word = new Word({
        term: req.params.term,
        definition,
        userId: req.userId
      });
      await word.save();
    } else {
      word.definition = definition;
      await word.save();
    }

    res.json({ term: req.params.term, definition });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching word from dictionary' });
  }
});

// Get viewed history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const words = await Word.find({ userId: req.userId });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
});

// Save word as favorite
router.patch('/favorite/:id', authMiddleware, async (req, res) => {
  try {
    const word = await Word.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isFavorite: true },
      { new: true }
    );
    if (!word) return res.status(404).json({ message: 'Word not found' });

    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorite status' });
  }
});

// Delete favorite word
router.delete('/favorite/:id', authMiddleware, async (req, res) => {
  try {
    const word = await Word.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isFavorite: false },
      { new: true }
    );
    if (!word) return res.status(404).json({ message: 'Word not found' });

    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite status' });
  }
});

module.exports = router;
