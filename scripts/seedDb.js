const { Profile, ProfileAggregatedHealthData } = require('../src/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Profile.sync({ force: true });
  await ProfileAggregatedHealthData.sync({ force: true });
  //insert data
  await Promise.all([
   Profile.create({
      id: 1,
      firstName: 'Harry',
      lastName: 'Potter',

    }),
    Profile.create({
      id: 2,
      firstName: 'Mr',
      lastName: 'Robot',
    }),
  ]);
}