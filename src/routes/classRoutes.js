const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/classController');

router.get('/', ClassController.getClasses);
router.post('/', ClassController.createClass);
router.put('/:id', ClassController.updateClass);
router.delete('/:id', ClassController.deleteClass);

module.exports = router;