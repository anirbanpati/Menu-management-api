const mongoose = require('mongoose');


// Connect to the database
function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT,
        {dbName: process.env.DB_NAME}
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
}


module.exports = connectToDb;