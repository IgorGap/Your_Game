const Bcrypt = require('../../utils/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Katya',
        email: 'katyah@mail.ru',
        password: await Bcrypt.hash('123'),
      },
      {
        name: 'User1',
        email: 'user1@mail.ru',
        password: await Bcrypt.hash('1234'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
