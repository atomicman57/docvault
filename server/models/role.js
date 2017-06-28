module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { args: true, msg: 'Title cannot be empty' } },
        unique: { args: true, msg: 'Role already exist' }
      }
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          Role.hasMany(models.User, {
            foreignKey: 'roleId'
          });
        }
      }
    }
  );
  return Role;
};
