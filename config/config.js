import * as dotenv from 'dotenv';
dotenv.config();


const config = {
  development: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DB_NAME || "express_curd",
    host: process.env.DB_DEV_HOST,
    logging: console.log,
    dialect: 'postgres',
    
  },
  test: {
    username: process.env.DB_TEST_USER || 'postgres',
    password: process.env.DB_TEST_PASSWORD || '69720700',
    database: process.env.DB_TEST_DB_NAME || 'peliculasdb',
    host: process.env.DB_TEST_HOST || '127.0.0.1',
    port: process.env.DB_TEST_PORT || 5432,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DB_NAME,
    host: process.env.DB_DEV_HOST,
    logging: false,
    dialect: 'postgres',
  },

};

export default config;


