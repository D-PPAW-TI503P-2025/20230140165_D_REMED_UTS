const Book = require('./Book');
const BorrowLog = require('./BorrowLog');

// Setup associations
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });
BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
    Book,
    BorrowLog
};
