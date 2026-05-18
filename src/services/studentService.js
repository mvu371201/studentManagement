const StudentModel = require('../models/studentModel');

const getAllStudents = async () => {
    return await StudentModel.findAll();
};
const createStudent = async (studentData) => {
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
};
const updateStudent = async (studentId, studentData) => {
    const updatedStudent = await StudentModel.update(studentId, studentData);
    // Không tim thầy sinh viên
    if (!updatedStudent) {
        throw new Error("STUDENT_NOT_FOUND");
    }

    return updatedStudent;
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent
};