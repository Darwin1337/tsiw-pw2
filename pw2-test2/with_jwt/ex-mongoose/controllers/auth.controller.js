const db = require("../models/index.js");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header == 'undefined')
        return res.status(401).json({ success: false, msg: "No token provided!" });
    
    const bearer = header.split(' ');
    const token = bearer[1];

    try{
        let decoded = jwt.verify(token, db.secret);
        req.loggedUsername = decoded.username;
        req.loggedIsAdmin = decoded.isAdmin;
        next();
    } catch (err){
        return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }
            
}