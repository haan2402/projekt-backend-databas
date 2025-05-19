//skapar REST-webbtjänst med MongoDB, Express och Cors, använder Mongoose
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const foodItem = require("./routes/foodItem");
const cors = require("cors");
require("dotenv").config();

//initierar express
const app = express();
const port = process.env.PORT || 3000;

//aktiverar cors
app.use(cors());
app.use(express.json());

//routing
app.use("/api/auth", authRoute);
app.use("/api/foodItems", foodItem);


//ansluter till MongoDB databas, Atlas
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB databas");
}). catch((error) => {
    console.log("Gick inte att ansluta till databas.." + error);
});

//startar applikationen
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});