module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'Document',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      access: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'public'
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: (models) => {
          // associations can be defined here
          Document.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
          });
        }
      }
    }
  );
  return Document;
};
