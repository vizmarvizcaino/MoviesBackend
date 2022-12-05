import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";
import { Comentario } from "./Comentario.js";

export const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_on'
  }
});



