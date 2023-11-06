require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/courses", require("./src/routes/course"));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    if (req.body) {
        console.log("Request body:");
        console.log(req.body);
    }
    next();
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen("3000", () => {
            console.log(`Listening on port 3000 and connected to MongoDB`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
