const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

//skapar funktion för hashed password
usersSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();

    } catch (error) {
        next(error);
    }
});

//jämför att lösenord stämmer
usersSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error){
        throw error;
    }
}

//registrering av ny användare
usersSchema.statics.register = async function(username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
    } catch (error){
        throw error;
    }
}

//funktion för att logga in användare
usersSchema.statics.login = async function(username, password) {
    try {
        //kontrollerar matchning av användarnamn
        const userMatch = await this.findOne({username});
        
        if(!userMatch) {
        throw new Error("Ogiltigt användarnamn/lösenord");
    }

    //kontrollerar matchning av lösenord
    const passwordMatch = await userMatch.comparePassword(password);

    if(!passwordMatch) {
        throw new Error("Ogiltigt användarnamn/lösenord");
    }

    //om inloggning korrekt så returneras det
    return userMatch;

    } catch (error){
        throw error;
    }
}

//exporterar user
const User = mongoose.model("User", usersSchema);
module.exports = User;