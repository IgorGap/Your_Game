'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cats', [
      {
        catTitle: 'Австралия',
      },
      {
        catTitle: 'Кинопремия "Оскар"',
      },
			{
        catTitle: 'Изобретения и технологии',
      },
			{
        catTitle: 'Музыка',
      },
			{
        catTitle: 'Титаник',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cats', null, {});
  },
};
