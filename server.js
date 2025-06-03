//skapar REST-webbtjänst med MongoDB, Express och Cors, använder Mongoose
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const foodItem = require("./routes/foodItem");
const authToken = require("./middleware/auth");
const cors = require("cors");
require("dotenv").config();

//initierar express
const app = express();
const port = process.env.PORT || 3000;

//aktiverar cors
app.use(cors({
    origin: ['http://localhost:1234', 'https://haan2402-bistro-norr.netlify.app', 'https://haan2402-bistro-norr-admin.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//routing
app.use("/api/auth", authRoute);
app.use("/api/foodItems", foodItem);

//en skyddad router
app.get("/api/protected", authToken, (req, res) => {
    res.json({message: "skyddad router"});
})

//ansluter till MongoDB databas, Atlas
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB databas");
}). catch((error) => {
    console.log("Gick inte att ansluta till databas.." + error);
});

//startar applikationen
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});