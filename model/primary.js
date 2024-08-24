const mongoose = require('mongoose');

const primarySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('primaries', primarySchema);
