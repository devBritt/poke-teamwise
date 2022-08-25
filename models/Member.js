const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Team = require('./Team');

class Member extends Model {}

Member.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Team,
                key: 'id'
            },
            onDelete: 'cascade'
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'member'
    }
);

module.exports = Member;