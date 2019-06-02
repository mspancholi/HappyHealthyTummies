// Dependencies
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/nutrition",
    { useNewUrlParser: true }
);

const userSeed = [
    {
        userID: "10218656497060780",
        userName: "Jigar Pancholi",
        calories: 500,
        carbs: 100,
        protein: 100,
        sugars: 10
    }
];


db.User.remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
