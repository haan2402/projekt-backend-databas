const mongoose = require("mongoose");

//skapar ett Schema för en rätt i matmenyn
const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//exporterar schemat
const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;