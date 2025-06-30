exports.sendSocketNotification = (userId, event, data) => {
  if (global._io) {
    global._io.to(userId.toString()).emit(event, data);
  }
};
