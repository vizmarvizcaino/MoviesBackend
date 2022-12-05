import app from './app.js';
import  sequelize  from './database/database.js';

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT || 4000);
    console.log('Server reading on port 4000');
  } catch (error) {
    console.log('conexion fallo.', error);
  }
}
main();
