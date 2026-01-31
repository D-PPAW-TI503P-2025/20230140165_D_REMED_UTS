const { Book, BorrowLog } = require('../models');
const sequelize = require('../config/database');

exports.borrowBook = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { bookId, latitude, longitude } = req.body;
        const userId = req.user.id; // From middleware

        // Validasi input
        if (!bookId || !latitude || !longitude) {
            return res.status(400).json({ message: 'Data tidak lengkap (bookId, latitude, longitude required)' });
        }

        // Cek buku
        const book = await Book.findByPk(bookId, { transaction: t });
        if (!book) {
            await t.rollback();
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }

        // Cek stok
        if (book.stock <= 0) {
            await t.rollback();
            return res.status(400).json({ message: 'Stok buku habis' });
        }

        // Kurangi stok
        await book.update({ stock: book.stock - 1 }, { transaction: t });

        // Catat log
        const log = await BorrowLog.create({
            userId,
            bookId,
            latitude,
            longitude
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Peminjaman berhasil', data: log });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};

exports.getLogs = async (req, res) => {
    try {
        const logs = await BorrowLog.findAll({
            order: [['borrowDate', 'DESC']],
            include: [{ model: Book, attributes: ['title', 'author'] }]
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
