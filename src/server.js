const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const sequelize = require('./config/database_config');
const setupSwagger = require('./swagger_config');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);

// Setup Swagger
setupSwagger(app);

// Sync database
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(
      `Swagger docs are available at http://localhost:${port}/api-docs`
    );
  });
});
