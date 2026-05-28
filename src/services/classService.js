const ClassModel = require('../models/classModel.js');

const getAllClasses = async () => {
  return await ClassModel.findAll();
};

const createClass = async (classData) => {
  if (!classData.ClassCode || !classData.ClassName) {
    throw new Error("Mã lớp và Tên lớp không được để trống!");
  }
  return await ClassModel.create(classData);
};
const updateClass = async (id, classData) => {
  if (Object.keys(classData).length === 0) {
    throw new Error("Vui lòng cung cấp thông tin cần cập nhật!");
  }
  return await ClassModel.updateClass(id, classData);
};
const deleteClass = async (id) => {
  return await ClassModel.deleteClass(id);
};


module.exports = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass
};