const mongoose = require('mongoose');
const random = require('../controller/random');

const likes = new mongoose.Schema({
    id: { 
        type: Number, 
        default: random.generateRandomId, 
    },
    blogId: Number,
    userId: Number,
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('likes', likes);