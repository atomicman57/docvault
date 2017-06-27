module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Roles', [{
      title: 'Regular',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Roles', null, {})
};
