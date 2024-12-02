const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const tokenSecrets = new Map();

function generateDynamicSecret() {
    return crypto.randomBytes(32).toString('hex');
}

exports.signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = new User({ email, password: hashedPassword });
        await user.save();

        // Generate dynamic secret and JWT
        const secret = generateDynamicSecret();
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        // Store the secret
        tokenSecrets.set(user._id.toString(), secret);

        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate dynamic secret and JWT
        const secret = generateDynamicSecret();
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        // Store the secret
        tokenSecrets.set(user._id.toString(), secret);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
