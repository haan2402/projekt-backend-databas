const express = require("express");
const router = express.Router();
const FoodItem = require("../models/Menu");

//skapa en ny maträtt till menyn med POST
router.post("/", async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        //validerar att alla fält fylls i
        if(!name || !description || !price || !category ) {
            return res.status(400).json({error: "Inmatning ogiltig, alla fält måste fyllas i!"});
        }

        //om korrekt inmatning är gjord
        const newDish = new FoodItem({ name, description, price, category });
        await newDish.save();

        res.status(201).json({message: "Ny maträtt tillagd i menyn!"});
    } catch (error) {
        res.status(500).json({error: "Error with server, try again later.."});
    }
});

//hämtar befintliga rätter från databas med GET
router.get("/", async (req, res) => {
    try {
        const dishes = await FoodItem.find();
        res.status(200).json(dishes);
    } catch(error) {
        res.status(500).json({error: "Error with server, can't get dishes"});
    }
});

