// cronJobs.js

const cron = require('node-cron');
const axios = require('axios');

const scheduleCronJobs = () => {
    // Cron job to auto-update dates
    cron.schedule('0 0 * * *', async () => {
        try {
            await axios.post('http://localhost:5000/autoupdate-dates');
            console.log("DateArray auto-update completed");
        } catch (error) {
            console.error("Error auto-updating dates:", error.message);
        }
    });
};

module.exports = { scheduleCronJobs };
