const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(process.env.DB_HOST, options);
        console.log('Connected!');
    } catch (error) {
        console.log('>>> Error connect to DB:', error)
    }
}

module.exports = connectionDB 