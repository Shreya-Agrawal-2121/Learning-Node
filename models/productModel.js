const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter product quantity"],
    },
    expiryDate: {
        type: Date,
        required: false,
    }
},
{
    timestamps: true,
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;