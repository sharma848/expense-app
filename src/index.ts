//G0OwlxzfNqEgifn0

import express, { Express } from "express";
import mongoose from "mongoose";
import transactionRouter from "./routes/transactions"
import userRouter from "./routes/users"
const { jwtMiddleware } = require("./jwt.ts")

const App: Express = express();
const PORT = process.env.PORT || 3001;

App.use(express.json()); // allow all request to have JSON in request body

const mongoURI: string = "mongodb+srv://sharmaabhishek848:G0OwlxzfNqEgifn0@expensetracker.pgp18.mongodb.net/ExpenseTracker";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to mongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

// Midlleware function
const logRequest = (req: any, res: any, next: any) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);

    next();
}
App.use(logRequest)

App.use("/transactions", jwtMiddleware, transactionRouter)
App.use("/users", userRouter)

App.listen(PORT, () => {
    console.log("Server running successfuly!!!", PORT)
})