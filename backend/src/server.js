
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectionDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');


app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use('/', authRoutes);
app.use('/', noteRoutes);

const port = process.env.PORT;

(async () => {
    try {
        await connectionDB();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(`>>> Error connect to server ${error.message}`);
    }
})();
