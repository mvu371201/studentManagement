const ClassService = require('../services/classService');

const getClasses = async (req, res) => {
    try {
        const classes = await ClassService.getAllClasses();
        res.status(200).json(classes);
    } catch (error) {
        console.error("Lỗi Controller:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi lấy danh sách lớp" });
    }
};

const createClass = async (req, res) => {
    try {
        const newClass = await ClassService.createClass(req.body);
        res.status(201).json({ message: "Đã tạo lớp thành công", newClass });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).send("Mã lớp đã tồn tại, vui lòng chọn mã khác!");
        }
        res.status(400).json({ message: error.message || "Lỗi khi tạo lớp mới" });
    }
};
const updateClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const updateData = req.body;

        const updatedClass = await ClassService.updateClass(classId, updateData);

        if (!updatedClass) {
            return res.status(404).json({ message: "Không tìm thấy lớp học này để cập nhật!" });
        }

        res.status(200).json({ message: "Cập nhật thành công!", updatedClass });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).send("Mã lớp bị trùng với lớp khác!");
        }
        res.status(400).json({ message: error.message || "Lỗi khi cập nhật lớp học" });
    }
};
const deleteClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await ClassService.deleteClass(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: "Không tìm thấy lớp học này để xóa!" });
        }

        res.status(200).json({ message: "xóa lớp học thành công!", deletedClass });
    } catch (error) {
        res.status(400).json({ message: error.message || "Lỗi khi xóa lớp học" });
    }
};


module.exports = {
    getClasses,
    createClass,
    updateClass,
    deleteClass
};