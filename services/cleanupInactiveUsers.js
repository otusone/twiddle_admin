const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('../models/user');
const Session = require('../models/session');

cron.schedule('0 2 * * *', async () => {
    console.log('🧹 Running inactive user cleanup job...');
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const usersToDelete = await User.find({
            isProfileComplete: false,
            createdAt: { $lt: sevenDaysAgo }
        });

        for (const user of usersToDelete) {
            await Session.deleteMany({ userId: user._id });
            await User.deleteOne({ _id: user._id });
            console.log(`🗑️ Deleted incomplete user and sessions: ${user._id}`);
        }

        console.log(`Cleanup complete. Total removed: ${usersToDelete.length}`);
    } catch (error) {
        console.error(' Error during cleanup job:', error);
    }
});
