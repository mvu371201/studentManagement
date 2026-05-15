const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
router.get('/', studentController.getStudents);
// router.post('/', StudentController.createStudent);
// router.put('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);


module.exports = router;