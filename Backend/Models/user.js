const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sirname: {
        type: String,
        required: true,
    },
    mob_no: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,

    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;