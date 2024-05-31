const Member = require('../models/member_models');
const sequelize = require('../config/database_config');

const members = [
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
  },
];

const seedMembers = async () => {
  try {
    await sequelize.sync({ force: true });
    await Member.bulkCreate(members);
    console.log('Members seeded successfully');
  } catch (error) {
    console.error('Error seeding members:', error);
  } finally {
    await sequelize.close();
  }
};

seedMembers();
