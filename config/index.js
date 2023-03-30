require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST || '127.0.0.1',
    db_port: process.env.DB_PORT || 27017,
    db_name: process.env.DB_NAME || 'stepone',
    secret: process.env.SECRET || 'secret'
};


module.exports = config;