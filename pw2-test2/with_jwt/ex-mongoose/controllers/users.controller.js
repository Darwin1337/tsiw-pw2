const db = require("../models/index.js");
const User = db.users;
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try{
        if (!req.body || !req.body.username || !req.body.password)
            return res.status(400).json({ success: false, msg: "Must provide username and password." });
        
        let user = await User.findOne({ username: req.body.username}).exec();

        if (!user) return res.status(404).json({ success: false, msg: "User not found." });   
        
        const check = req.body.password == user.password;
        if (!check) return res.status(401).json({ success:false, accessToken:null, msg:"Invalid credentials!" });

        const token = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, db.secret, { expiresIn: '24h' });

        return res.status(200).json({ success: true, accessToken: token });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach((key) => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msgs: errors });
        }
        else
            res.status(500).json({ success: false, msg: err.message || "Some error occurred while loggin in." });
    }
};

exports.findOne = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id})
        .populate("rentals")
        .exec();

        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found." });   
        }

        if(req.loggedUsername != user.username)
            return res.status(401).json({ success:false, accessToken:null, msg:"No authorization" });

        res.status(200).json({ success: true, users: user });
    }
    catch (err) {
        res.status(500).json({
        success: false, msg: err.message || "Some error occurred while retrieving all users."
        });
    };
};