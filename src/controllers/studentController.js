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
const createStudent = async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await StudentService.createStudent(studentData);

        res.status(201).json({
            success: true,
            message: "Thêm hồ sơ sinh viên thành công!",
            data: newStudent
        });
    } catch (error) {
        console.error("Lỗi khi tạo sinh viên:", error.message);

        // Lỗi trùng mã sinh viên
        if (error.code === '23505') {
            return res.status(400).json({
                success: false,
                message: "Mã sinh viên hoặc AccountID đã tồn tại trong hệ thống."
            });
        }

        res.status(500).json({
            success: false,
            message: "Lỗi Server",
            error: error.message
        });
    }
};
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentData = req.body;
        const updatedStudent = await StudentService.updateStudent(studentId, studentData);

        res.status(200).json({
            success: true,
            message: "Cập nhật hồ sơ sinh viên thành công!",
            data: updatedStudent
        });
    } catch (error) {
        if (error.message === "STUDENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ sinh viên này."
            });
        }

        console.error("Lỗi khi cập nhật sinh viên:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server",
            error: error.message
        });
    }
};
const lockStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        await StudentService.lockStudent(studentId);
        res.status(200).json({
            success: true,
            message: "Khóa hồ sơ sinh viên thành công!",

        });
    } catch (error) {
        if (error.message === "STUDENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ sinh viên này."
            });
        }
        console.error("Lỗi khi khóa sinh viên:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server",
            error: error.message
        });
    }
};

const unlockStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        await StudentService.unlockStudent(studentId);
        res.status(200).json({
            success: true,
            message: "Mở khóa tài khoản và chuyển trạng thái sinh viên thành công!"
        });
    } catch (error) {
        if (error.message === "STUDENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy hồ sơ sinh viên này."
            });
        }
        console.error("Lỗi khi mở khóa sinh viên:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server",
            error: error.message
        });
    }
};



module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    lockStudent,
    unlockStudent
};