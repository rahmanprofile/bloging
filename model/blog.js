const mongoose = require('mongoose');
const random = require("../controller/random");

// Define the schema directly
const blogSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        default: random.generateRandomId, 
    },
    userId: {type: Number, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, default: ''},
    categoryId: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export the model using the schema
module.exports = mongoose.model("blogs", blogSchema);
