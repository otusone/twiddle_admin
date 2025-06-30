
const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URI;
const User = require("../models/user");

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    //   await User.collection.dropIndex("location.coordinates_2dsphere");
    //  const indexes = await User.collection.getIndexes();
    //   console.log(indexes);

    // await User.syncIndexes();

    // const result = await User.collection.createIndex({ location: '2dsphere' });
    // console.log('✅ 2dsphere index ensured:', result);

    // const result = await User.updateMany(
    //   {},
    //   {
    //     $set: {
    //       location: {
    //         type: 'Point',
    //         coordinates: [77.3812, 28.6210] // longitude, latitude
    //       }
    //     }
    //   }
    // );

    // console.log(`Updated ${result.modifiedCount} users' location to [77.3812, 28.6210]`);

  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;
