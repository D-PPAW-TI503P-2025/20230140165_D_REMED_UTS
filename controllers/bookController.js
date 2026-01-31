const { Book } = require('../models');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ message: 'Buku berhasil ditambahkan', data: book });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

        await book.update(req.body);
        res.json({ message: 'Buku berhasil diupdate', data: book });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

        await book.destroy();
        res.json({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
