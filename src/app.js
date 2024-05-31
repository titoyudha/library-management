const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bookRoutes = require('./routes/book_routes');
const memberRoutes = require('./routes/member_routes');
const borrowRoutes = require('./routes/borrow_routes');
const penaltyRoutes = require('./routes/penalty_routes');

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API for managing library books and members',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', bookRoutes);
app.use('/api', memberRoutes);
app.use('/api', borrowRoutes);
app.use('/api', penaltyRoutes);

module.exports = app;
