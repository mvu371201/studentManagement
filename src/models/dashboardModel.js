const pool = require('../config/database');

// 1. Lấy tổng số sinh viên
const getTotalStudents = async () => {
    try {
        const result = await pool.query(`SELECT COUNT(*) FROM "Students"`);
        return {
            TotalStudents: parseInt(result.rows[0].count)
        };
    } catch (error) {
        throw error;
    }
};

// 2. Lấy tổng số lớp
const getTotalClasses = async () => {
    try {
        const result = await pool.query(`SELECT COUNT(*) FROM "Classes"`);
        return {
            TotalClasses: parseInt(result.rows[0].count)
        };
    } catch (error) {
        throw error;
    }
};

// 3. Lấy thống kê theo trạng thái học tập
const getStatusStats = async () => {
    try {
        const result = await pool.query(`
            SELECT "AcademicStatus" AS "Status", COUNT(*) AS "Total" 
            FROM "Students" 
            GROUP BY "AcademicStatus"
        `);
        return {
            StatusStats: result.rows.map(row => ({
                Status: row.Status,
                Total: parseInt(row.Total)
            }))
        };
    } catch (error) {
        throw error;
    }
};

// 4. Lấy thống kê theo giới tính
const getGenderStats = async () => {
    try {
        const result = await pool.query(`
            SELECT "Gender", COUNT(*) AS "Total" 
            FROM "Students" 
            GROUP BY "Gender"
        `);
        return {
            GenderStats: result.rows.map(row => ({
                Gender: row.Gender,
                Total: parseInt(row.Total)
            }))
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTotalStudents,
    getTotalClasses,
    getStatusStats,
    getGenderStats
};
