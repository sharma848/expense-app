import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    title: { type: String, required: true},
    category: { type: String, required: true},
    date: { type: Date, required: true},
    amount: { type: Number, required: true},
    mode: { type: String, required: true},
    type: { type: String, required: true}
});

const TransactionsModel = mongoose.model("Transactions", transactionsSchema);

export default TransactionsModel;