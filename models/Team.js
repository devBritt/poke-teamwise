const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { User } = require("./User");

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "cascade",
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "team",
  }
);

module.exports = Team;
