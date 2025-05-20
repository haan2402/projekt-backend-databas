const express = require("express");
const router = express.Router();
const User = require("./models/User");
const jwt = require("jsonwebtoken");

//post för ny användare
router.post("/register", async (req, res) => {
    try {
    const { username, password } = req.body;

    //validerar inputfält
    if(!username || !password) {
        return res.status(400).json({error: "Inmatning ogiltig, användarnamn/lösenord måste fyllas i"});
    }

    //om det är korrekt inmatning
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({message: "Ny användare skapad!"});

    } catch(error) {
        res.status(500).json({error: "Error with server, try again later.."});
    }
});

//inloggning för behöriga användare
router.post("/login", async (req, res) => {
    try {
    const { username, password } = req.body;

    //validerar inputfält
    if(!username || !password) {
        return res.status(400).json({error: "Inmatning ogiltig, användarnamn/lösenord måste fyllas i"});
    }

    //kontroll om användaren finns och kan logga in
    const userMatch = await User.findOne({username});
    if(!userMatch) {
        return res.status(401).json({error: "Ogiltigt användarnamn/lösenord"});
    }

    //kontrollerar lösenord
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) {
        return res.status(401).json({error: "Ogiltigt användarnamn/lösenord"});
    } else {
        //skapar en JWT
        const payload = { username: username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h'});
        const response = {
            message: "Du är nu inloggad!",
            token: token
        }

        res.status(200).json({response});
    }

    } catch(error) {
        res.status(500).json({error: "Error with server, try again later.."});
    }
});

//exporterar
module.exports = router;


