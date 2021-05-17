'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Animals', [{
      title: 'Chimpanzee',
      status: 'indangered',
      fImage: 'pexels-pixabay-34231.jpg',
      description: 'here is a chimpanzee to see it really good',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
