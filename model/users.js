const mongoose = require('mongoose');
const random = require('../controller/random');

// Define the user schema
const userSchema = new mongoose.Schema({
    id: {type: Number, default: random.generateRandomId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    primaryId: { type: Number, required: true },
    imageUrl: { type: String, default: '' },
    country: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    about: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('user', userSchema);
