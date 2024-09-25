const jwt = require("jsonwebtoken");

const jwtMiddleware = (req: any, res: any, next: any) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({ error: "authorization missing in request"})
    }
    console.log(authorization)
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
        return res.status(401).json({ error: "unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, "1234")

        req.userId = decoded;
        next();
    } catch(err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

const generateToken = (userData: any) => {
    return jwt.sign(userData, "1234")
}

module.exports = { jwtMiddleware, generateToken };