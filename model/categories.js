const mongoose = require('mongoose');
const random = require('../controller/random');

const categories = new mongoose.Schema({
    id: { 
        type: Number, 
        default: random.generateRandomId,
        unique: true, 
    },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('categories', categories);