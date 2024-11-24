const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
});
const Book = mongoose.model('books', bookSchema);

// Create
app.post('/', async (req, res) => {
    try {
        // const { bookData } = req.body
        const book = new Book(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read
app.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read by Id
app.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' })
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
app.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' })
        };
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

mongoose.connect("mongodb://localhost:27017/bookCRUD", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongo DB'))
    .catch(err => console.error('Some error in connecting to Mongo DB:', err));

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});
