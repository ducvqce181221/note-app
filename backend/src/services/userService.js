const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/password");
const validator = require('validator');
const mongoose = require('mongoose');


const createUser = async ({ fullName, email, password }) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    });

    return user;
}

const loginUser = async ({ email, password }) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
}

const getUserById = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}


module.exports = { createUser, loginUser, getUserById };