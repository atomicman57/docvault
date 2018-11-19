module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    "Document",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { args: true, msg: "Title already exist" },
        validate: { notEmpty: { args: true, msg: "Title cannot be empty" } }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: { args: true, msg: "Content cannot be empty" } }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      access: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "public",
        validate: {
          isIn: {
            args: [["public", "private", "role"]],
            msg: "Use a valid access type"
          }
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: models => {
          // associations can be defined here
          Document.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
          });

          Document.belongsTo(models.Category, {
            foreignKey: "categoryId",
            onDelete: "CASCADE"
          });
        }
      }
    }
  );
  return Document;
};
