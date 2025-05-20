const mongoose = require("mongoose");

//skapar ett schema för användare
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Användarnamn måste fyllas i!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Lösenord måste fyllas i!"]
    }
});

//exporterar user
const User = mongoose.model("User", usersSchema);
module.exports = User;