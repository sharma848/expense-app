var jwt = require("jsonwebtoken");
var jwtMiddleware = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "authorization missing in request" });
    }
    console.log(authorization);
    var token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "unauthorized" });
    }
    try {
        var decoded = jwt.verify(token, "1234");
        req.userId = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
var generateToken = function (userData) {
    return jwt.sign(userData, "1234");
};
module.exports = { jwtMiddleware: jwtMiddleware, generateToken: generateToken };
