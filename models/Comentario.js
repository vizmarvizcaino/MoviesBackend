import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";

export const Comentario = sequelize.define('Comentarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contenido: {
    type: DataTypes.STRING
  },
  user: {
    type: DataTypes.STRING
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_on'
  }
});




