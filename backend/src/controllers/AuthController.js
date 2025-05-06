const { createUser, loginUser, getUserById } = require("../services/userService");
const { createJWT } = require("../utils/jwt");


const createAccount = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: 'Full name is required' });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: 'Password is required' });
    }

    try {
        const user = await createUser({ fullName, email, password });

        // Tạo JWT
        const accessToken = createJWT({ id: user._id });

        return res.status(201).json({
            error: false,
            accessToken,
            message: 'Registration Successful'
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: 'Password is required' });
    }

    try {
        const user = await loginUser({ email, password });
        const accessToken = createJWT({ id: user._id });

        return res.json({
            error: false,
            message: 'Login Successful',
            email,
            accessToken
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }

}

const getUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await getUserById(userId);
        return res.json({
            error: false,
            user,
            message: 'User retrieved successfully'
        });
    } catch (error) {
        return res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

module.exports = { createAccount, login, getUser };