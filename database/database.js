import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();
import _config from "../config/config.js";

const env = process.env.ENV;
const config = _config[env];

console.log(config)

// create connection
const secuelize = new Sequelize(
  "peliculasdb",
  "postgres",
  "69720700",
  {
    host: "localhost",
    dialect: 'postgres',
    logging: "false",
    define: {
      timestamps: false
    }
  },
);

export default secuelize;
