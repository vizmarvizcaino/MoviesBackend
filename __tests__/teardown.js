import  sequelize  from "../database/database.js";

after(async () => {  
  await sequelize.close();
});

