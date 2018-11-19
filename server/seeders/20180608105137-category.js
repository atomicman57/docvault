module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Personal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Report",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Company",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Report",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Draft",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete("Roles", null, {})
};
