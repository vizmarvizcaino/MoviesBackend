import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();
import _config from "../config/config.js";

const env = process.env.ENV;
const config = _config[env];

// create connection
const secuelize = new Sequelize(
  "express_curd",
  "postgress",
  "937rapIb8tgXtUmbk5afmQqLOzSZAR2q",
  {
    host: "localhost",
    dialect: 'postgres',
    logging: "console.log",
    define: {
      timestamps: false
    }
  },
);

export default secuelize;
