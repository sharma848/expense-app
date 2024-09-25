const express = require("express");
const TransactionsModel = require("../schema/transactions");

const router = express.Router();

router.get("/getAllByUserId", async (req, res) => {
    try {
        const userId = req.userId;
        const records = await TransactionsModel.find({ userId: userId });

        if (records.length) {
            return res.status(200).send(records);
        }

        return res
            .status(404)
            .json({ message: "No transaction record found for user." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.post("/add", async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId;
        const record = new TransactionsModel({ ...body, userId: userId });

        const newRecord = await record.save();

        res.status(200).json({ data: newRecord });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/update/:transactionId", async (req, res) => {
    try {
        const body = req.body;
        const transactionId = req.params.transactionId;
        const record = await TransactionsModel.findByIdAndUpdate(
            transactionId,
            body
        );

        if (record) {
            return res.status(200).json({ data: record });
        }

        res.status(404).json({ data: "Transaction not found." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/delete/:transactionId", async (req, res) => {
    try {
        const transactionId = req.params.transactionId;
        const record = await TransactionsModel.findByIdAndDelete(transactionId);

        if (record) {
            return res.status(200).json({ data: record });
        }

        res.status(404).json({ data: "Transaction not found." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
