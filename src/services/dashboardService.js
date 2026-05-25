const DashboardModel = require('../models/dashboardModel');

const getTotalStudents = async () => {
    try {
        return await DashboardModel.getTotalStudents();
    } catch (error) {
        throw error;
    }
};

const getTotalClasses = async () => {
    try {
        return await DashboardModel.getTotalClasses();
    } catch (error) {
        throw error;
    }
};

const getStatusStats = async () => {
    try {
        return await DashboardModel.getStatusStats();
    } catch (error) {
        throw error;
    }
};

const getGenderStats = async () => {
    try {
        return await DashboardModel.getGenderStats();
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
