const express = require('express');
const classRoutes = require('./routes/classRoutes');
const studentRouter = require('./routes/studentRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRouter);

// Error handling basic
app.use((err, req, res, next) => {
  console.error(" SẬP SERVER:", err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
