const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Root endpoint info
app.get('/', (req, res) => {
    res.send('Library System API with Geolocation is Running');
});

// Database Sync & Server Start
sequelize.sync({ force: false }) // Set force: true to reset db (dev only)
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });
