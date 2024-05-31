const sequelize = require('../config/database_config');
const seedBooks = require('./book_seeders');
const seedMembers = require('./member_seeders');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedBooks();
    await seedMembers();
    console.log('All data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedAll();
