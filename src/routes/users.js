const express = require("express");
const UserModel = require("../schema/users");
const { generateToken } = require("../jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await UserModel.find({ userId: userId });
        const token = generateToken(userId);

        if (user.length) {
            return res.status(200).json({ token: token });
        }

        const userModel = new UserModel(req.body);
        await userModel.save();

        return res.status(200).json({ token: token });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
