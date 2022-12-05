import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/database.js";
import { Comentario } from './Comentario.js';

export const Pelicula = sequelize.define('Peliculas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  sinopsis: {
    type: DataTypes.STRING
  },
  ano: {
    type: DataTypes.STRING
  },
  director: {
    type: DataTypes.STRING
  },
  image:{
    type: DataTypes.STRING
  },
  categoria1:{
    type: DataTypes.STRING
  },
  categoria2:{
    type: DataTypes.STRING
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_on'
  }
});

Pelicula.hasMany(Comentario,{
  foreignKey: 'peliculaId',
  sourceKey: 'id'
});

Comentario.belongsTo(Pelicula,{
  foreignKey: 'peliculaId',
  targetId: 'id'
});


