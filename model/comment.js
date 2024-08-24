const mongoose = require('mongoose');
const random = require('../controller/random');

const comment = new mongoose.Schema({
    id: { 
        type: Number, 
        default: random.generateRandomId, 
    },
    blogId: Number,
    userId: Number,
    comment: String,
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('comment', comment);