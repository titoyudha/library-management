'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'members',
      [
        {
          code: 'M001',
          name: 'Angga',
          penalty: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'M002',
          name: 'Ferry',
          penalty: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 'M003',
          name: 'Putri',
          penalty: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('members', null, {});
  },
};
