const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const morgan = require('morgan'); 

// Import routes
const categoryRoutes = require('./routes/category.routes');
const subCategoryRoutes = require('./routes/subcategory.routes');
const itemRoutes = require('./routes/items.routes');
const { searchItemsByName } = require('./controllers/search.controller'); // Import search controller

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Connect to the database
connectToDb();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use routes
app.use('/category', categoryRoutes);
app.use('/subcategory', subCategoryRoutes);
app.use('/items', itemRoutes);

// Search route
app.get('/search', searchItemsByName);

module.exports = app;