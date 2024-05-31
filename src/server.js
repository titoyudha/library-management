const sequelize = require('./config/database_config');
const app = require('./app');

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
