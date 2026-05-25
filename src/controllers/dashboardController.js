const DashboardService = require('../services/dashboardService');

const getTotalStudents = async (req, res) => {
    try {
        const data = await DashboardService.getTotalStudents();
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi khi lấy tổng sinh viên:", error);
        res.status(500).json({ 
            message: "Lỗi Server", 
            error: error.message 
        });
    }
};

const getTotalClasses = async (req, res) => {
    try {
        const data = await DashboardService.getTotalClasses();
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi khi lấy tổng lớp:", error);
        res.status(500).json({ 
            message: "Lỗi Server", 
            error: error.message 
        });
    }
};

const getStatusStats = async (req, res) => {
    try {
        const data = await DashboardService.getStatusStats();
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi khi lấy thống kê trạng thái:", error);
        res.status(500).json({ 
            message: "Lỗi Server", 
            error: error.message 
        });
    }
};

const getGenderStats = async (req, res) => {
    try {
        const data = await DashboardService.getGenderStats();
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi khi lấy thống kê giới tính:", error);
        res.status(500).json({ 
            message: "Lỗi Server", 
            error: error.message 
        });
    }
};

module.exports = {
    getTotalStudents,
    getTotalClasses,
    getStatusStats,
    getGenderStats
};
