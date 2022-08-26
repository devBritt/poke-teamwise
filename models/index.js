const Favorites = require('./Favorites');
const Member = require('./Member');
const Team = require('./Team');
const User = require('./User');

// user associations
// user has many favorite
User.hasMany(Favorites);
// user has many team
User.hasMany(Team);

// favorites associations
// favorites belong to user
Favorites.belongsTo(User);

// team associations
// team belongs to user
Team.belongsTo(User);
// team has many member
Team.hasMany(Member);

// member associations
// member belongs to team
Member.belongsTo(Team);

module.exports = {Favorites, Member, Team, User};