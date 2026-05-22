const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Lấy toàn bộ sinh viên
router.get('/', studentController.getStudents);

// Tạo sinh viên mới
router.post('/', studentController.createStudent);

// Cập nhật thông tin sinh viên
router.put('/:id', studentController.updateStudent);

// Khóa tài khoản và chuyển trạng thái đình chỉ học
router.patch('/:id/lock', studentController.lockStudent);

// Mở khóa tài khoản và chuyển trạng thái sinh viên
router.patch('/:id/unlock', studentController.unlockStudent);

module.exports = router;