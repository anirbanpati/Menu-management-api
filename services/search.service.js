const Item = require('../models/items.model');

// Search items by name
exports.searchItemsByName = async (name) => {
    if (!name) throw new Error('Item name is required');
    return await Item.find({ name: new RegExp(name, 'i') });
};
