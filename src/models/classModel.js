const pool = require('../config/database');

//  lấy dữ liệu lớp học
const findAll = async () => {
    const query = 'SELECT * FROM "Classes" ORDER BY "ClassID" ASC';
    const { rows } = await pool.query(query);
    return rows;
};

// Thêm lớp học
const create = async (classData) => {
    const { ClassCode, ClassName, Faculty } = classData;
    const query = `
        INSERT INTO "Classes" ("ClassCode", "ClassName", "Faculty")
        VALUES ($1, $2, $3)
        RETURNING *; 
    `;
    const values = [ClassCode, ClassName, Faculty];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const updateClass = async (id, classData) => {
    const field = []
    const value = []
    let index = 1;
    if (classData.ClassCode) {
        field.push(`"ClassCode" = $${index}`);
        value.push(classData.ClassCode);
        index++;
    }
    if (classData.ClassName) {
        field.push(`"ClassName" = $${index}`);
        value.push(classData.ClassName);
        index++;
    }
    if (classData.Faculty) {
        field.push(`"Faculty" = $${index}`);
        value.push(classData.Faculty);
        index++;
    }
    value.push(id)
    const query = `
        UPDATE "Classes" 
        SET ${field.join(", ")} 
        WHERE "ClassID" = $${index} 
        RETURNING *;
    `;

    const result = await pool.query(query, value);

    return result.rows[0];
};
const deleteClass = async (id) => {
    const query = `
        DELETE FROM "Classes" 
        WHERE "ClassID" = $1 
        RETURNING *;
    `;
    const values = [id];

    const result = await pool.query(query, values);

    return result.rows[0];
};




module.exports = {
    findAll,
    create,
    updateClass,
    deleteClass
};