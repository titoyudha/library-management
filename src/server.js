const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const sequelize = require('./config/database_config');
const { swaggerUi, swaggerSpec } = require('./swagger_config');

const app = express();

app.use(bodyParser.json());

// Route definitions
app.use(routes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
