const mongoose = require('mongoose');
const logger = require('../utils/logger'); // Import logger

// Connect to the database
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, { dbName: process.env.DB_NAME })
        .then(() => logger.info('Connected to MongoDB'))
        .catch(err => logger.error('Could not connect to MongoDB', { error: err.message }));
}

module.exports = connectToDb;