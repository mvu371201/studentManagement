const StudentModel = require('../models/studentModel');

const getAllStudents = async () => {
    return await StudentModel.findAll();
};

module.exports = {
    getAllStudents
};