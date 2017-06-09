module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE'
          });
        }
      }
    }
  );
  return User;
};
