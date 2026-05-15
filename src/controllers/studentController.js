const StudentService = require('../services/studentService');

const getStudents = async (req, res) => {
    try {
        const students = await StudentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        console.error("Lỗi Controller:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi lấy danh sách sinh viên" });
    }
};



module.exports = {
    getStudents
};