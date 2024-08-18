const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {

        const users = await User.find();
        res.json({ "success": "true", "message": "Granted", users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUsers = async (req, res) => {
    const { username, name, sirname, mob_no, email, password, role } = req.body;
    try {
        const existUsername = await User.findOne({ username: username });
        const existEmail = await User.findOne({ email: email });
        const existMobileno = await User.findOne({ mob_no: mob_no });
        if (existUsername || existMobileno || existEmail) {
            res.status(400).json({ "status": false, message: "user already exist" });
        } else {
            const newpassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, name, sirname, mob_no, email, password: newpassword, role });
            const savedUser = await newUser.save();
            res.status(201).json({ "status": true, message: "Submitted Successfully", "user": savedUser });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {

        const existUser = await User.findOne({ username: username });
        if (existUser) {
            const passwordMatch = await bcrypt.compare(password, existUser.password);
            if (passwordMatch) {
                const token = jwt.sign({ email_id: existUser.email_id }, 'your_secret_key');
                // Store token in session
                req.session.newtoken = token;

                res.status(200).json({ "status": true, message: "user login successfully", _token: token, user: existUser });
            } else {
                res.status(404).json({ "status": false, message: "Invalid username or password please check once" });
            }
        } else {
            res.status(200).json({ "status": false, message: "Invalid username or password please check once" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}