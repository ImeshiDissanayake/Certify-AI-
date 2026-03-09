const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretcertifyaiky');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Admin middleware
const adminAuth = (req, res, next) => {
    auth(req, res, () => {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ msg: 'Access denied. Admin role required.' });
        }
        next();
    });
};

// Basic Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: 'Node.js Backend is running perfectly!' });
});

// Configure MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/certifyai';
mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected...');
        
        // Create default admin user if it doesn't exist
        const User = require('./models/User');
        const bcrypt = require('bcryptjs');
        
        const adminExists = await User.findOne({ email: 'admin@certify.ai' });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            
            const adminUser = new User({
                name: 'Admin User',
                email: 'admin@certify.ai',
                password: hashedPassword,
                role: 'Admin'
            });
            
            await adminUser.save();
            console.log('Default admin user created: admin@certify.ai / admin123');
        }
    })
    .catch(err => console.log('MongoDB Connection Error: ', err));

// Auth Routes
app.use('/api/auth', require('./routes/auth'));
// Admin Routes
app.use('/api/admin', adminAuth, require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Additional server configuration for better error handling
