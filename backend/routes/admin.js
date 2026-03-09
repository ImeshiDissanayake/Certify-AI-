// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Route: Fetch all users
router.get('/users', async (req, res) => {
    try {
        // Fetch all users but exclude their hashed passwords for security
        const users = await User.find().select('-password').sort({ date: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
});

// --- COURSE MANAGEMENT ROUTES ---

// Route: Fetch all manually added courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: 'Server error while fetching courses.' });
    }
});

// Route: Add a new course
router.post('/courses', async (req, res) => {
    try {
        const { title, organization } = req.body;
        if (!title || !organization) {
            return res.status(400).json({ message: 'Title and Organization are required.' });
        }

        const newCourse = new Course({ title, organization });
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: 'Server error while adding course.' });
    }
});

// We will add routes to delete users or update roles here later!

module.exports = router;
