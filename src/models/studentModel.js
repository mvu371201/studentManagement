const pool = require('../config/database');

const findAll = async () => {
    const query = `
        SELECT s.*, c."ClassName", c."Faculty", c."ClassCode"
        FROM "Students" s
        LEFT JOIN "Classes" c ON s."ClassID" = c."ClassID"
        ORDER BY s."id" ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    findAll
};