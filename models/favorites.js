const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//creates favorite model
class Favorites extends Model {}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: 'cascade'
    },
    pokemon_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "favorites",
  }
);

module.exports = Favorites;
