const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric', 'BMX', 'Cruiser']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    specifications: {
        frameSize: String,
        wheelSize: String,
        gears: Number,
        weight: String,
        material: String,
        color: String
    },
    images: [{
        type: String,
        required: true
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Bicycle', bicycleSchema);