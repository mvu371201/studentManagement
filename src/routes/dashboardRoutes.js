const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Lấy tổng số sinh viên
router.get('/total-students', dashboardController.getTotalStudents);

// Lấy tổng số lớp
router.get('/total-classes', dashboardController.getTotalClasses);

// Lấy thống kê theo trạng thái học tập
router.get('/status-stats', dashboardController.getStatusStats);

// Lấy thống kê theo giới tính
router.get('/gender-stats', dashboardController.getGenderStats);

// Lấy thống kê theo ngành học 
router.get('/major-stats', dashboardController.getMajorStats);

module.exports = router;
