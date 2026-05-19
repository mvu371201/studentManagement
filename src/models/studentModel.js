const pool = require('../config/database');
const bcrypt = require('bcrypt');
// Lấy danh sách sinh viên và lớp học của sinh viên đó 
const findAll = async () => {
    const query = `
        SELECT s.*, c."ClassName", c."Faculty", c."ClassCode"
        FROM "Students" s
        LEFT JOIN "Classes" c ON s."ClassID" = c."ClassID"
        ORDER BY s."StudentID" ASC;
    `;
    const result = await pool.query(query);
    return result.rows;
};
// Tạo sinh viên và tài khoản 
const create = async (studentData) => {
    const {
        ClassCode, StudentCode, FullName,
        DateOfBirth, Gender, PersonalEmail, PhoneNumber, Address, AcademicStatus,
    } = studentData;
    console.log("test", ClassCode);

    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        let validClassID = null;
        if (ClassCode) {
            const classQuery = `SELECT "ClassID" FROM "Classes" WHERE "ClassCode" = $1;`;
            const classResult = await client.query(classQuery, [ClassCode]);
            if (classResult.rows.length === 0) {
                throw new Error(`Không tìm thấy lớp học với mã: ${ClassCode}`);
            }
            validClassID = classResult.rows[0].ClassID;
            console.log(validClassID);
        }

        // Mã hóa pass bằng số điện thoại (Độ phức tạp 10)
        const hashedPassword = await bcrypt.hash(PhoneNumber, 10);

        const accountQuery = `
            INSERT INTO "Account" ("Username", "Password", "Role", "IsActive") 
            VALUES ($1, $2, 'Student', true) 
            RETURNING "AccountID";
        `;
        const accountResult = await client.query(accountQuery, [StudentCode, hashedPassword]);


        const newAccountID = accountResult.rows[0].AccountID;


        const studentQuery = `
            INSERT INTO "Students" (
                "AccountID", "ClassID", "StudentCode", "FullName", 
                "DateOfBirth", "Gender", "PersonalEmail", "PhoneNumber", "Address", "AcademicStatus"
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;
        const studentValues = [
            newAccountID,
            validClassID,
            StudentCode,
            FullName,
            DateOfBirth,
            Gender,
            PersonalEmail,
            PhoneNumber,
            Address,
            AcademicStatus || 'DangHoc'
        ];

        const studentResult = await client.query(studentQuery, studentValues);

        await client.query('COMMIT');

        return studentResult.rows[0];

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {

        client.release();
    }
};
const update = async (studentId, updateData) => {
    const fields = [];
    const values = [];
    let index = 1;
    // sau này thêm roleuser sau. flag1
    for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'StudentID' && key !== 'AccountID' && key !== 'StudentCode') {
            fields.push(`"${key}" = $${index}`);
            values.push(value);
            index++;
        }
    }
    if (fields.length === 0) return null;

    fields.push(`"UpdatedAt" = CURRENT_TIMESTAMP`);

    values.push(studentId);

    const query = `
        UPDATE "Students"
        SET ${fields.join(', ')} -- Nối chuỗi các cặp key = value, ví dụ: "FullName" = $1, "ClassID" = $2
        WHERE "StudentID" = $${index} -- 
        RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
};
// Khóa sinh viên
const lockStudent = async (studentId) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const lockAccountQuery = `
            UPDATE "Account" 
            SET "IsActive" = false
            WHERE "AccountID" = (
                SELECT "AccountID" FROM "Students" WHERE "StudentID" = $1
            );
        `;
        await client.query(lockAccountQuery, [studentId]);

        // 2. Chuyển trạng thái hồ sơ Sinh viên thành Đình chỉ
        // flag2: Bị khóa -> chuyển trạng thái sang đình chỉ học 
        const updateStudentQuery = `
            UPDATE "Students"
            SET "AcademicStatus" = 'DinhChi', "UpdatedAt" = CURRENT_TIMESTAMP
            WHERE "StudentID" = $1
            RETURNING *;
        `;
        const studentResult = await client.query(updateStudentQuery, [studentId]);

        await client.query('COMMIT');

        return studentResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
// Mở khóa sinh viên
const unlockStudent = async (studentId) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Mở khóa Account (IsActive = true)
        const unlockAccountQuery = `
            UPDATE "Account" 
            SET "IsActive" = true
            WHERE "AccountID" = (
                SELECT "AccountID" FROM "Students" WHERE "StudentID" = $1
            );
        `;
        await client.query(unlockAccountQuery, [studentId]);

        // 2. Chuyển trạng thái hồ sơ Sinh viên về lại 'DangHoc'
        const updateStudentQuery = `
            UPDATE "Students"
            SET "AcademicStatus" = 'DangHoc', "UpdatedAt" = CURRENT_TIMESTAMP
            WHERE "StudentID" = $1
            RETURNING *;
        `;
        const studentResult = await client.query(updateStudentQuery, [studentId]);

        await client.query('COMMIT');

        return studentResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};




module.exports = {
    findAll,
    create,
    update,
    lockStudent,
    unlockStudent
};