const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

class Profile extends Sequelize.Model {}
Profile.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Profile',
  },
);

class ProfileAggregatedHealthData extends Sequelize.Model {}
ProfileAggregatedHealthData.init(
  {
    profileId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProfileAggregatedHealthData',
  },
);



ProfileAggregatedHealthData.belongsTo(Profile, { foreignKey: 'profileId' });

module.exports = {
  sequelize,
  Profile,
  ProfileAggregatedHealthData
};
