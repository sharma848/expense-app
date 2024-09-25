//G0OwlxzfNqEgifn0

const express = require("express");
const mongoose = require("mongoose");
const transactionRouter = require("./routes/transactions.js");
const userRouter = require("./routes/users.js");
const { jwtMiddleware } = require("./jwt.js");

const App = express();
const PORT = process.env.PORT || 3001;

App.use(express.json()); // allow all request to have JSON in request body

const mongoURI =
    "mongodb+srv://sharmaabhishek848:G0OwlxzfNqEgifn0@expensetracker.pgp18.mongodb.net/ExpenseTracker";

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// Midlleware function
const logRequest = (req, res, next) => {
    console.log(
        `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
    );

    next();
};
App.use(logRequest);

App.use("/transactions", jwtMiddleware, transactionRouter);
App.use("/users", userRouter);

App.listen(PORT, () => {
    console.log("Server running successfuly!!!", PORT);
});
