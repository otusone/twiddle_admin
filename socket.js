const { Server } = require("socket.io");
const Chat = require("./models/chatRoom");

const onlineUsers = new Map();

const setupSocket = async (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  global._io = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_room", (contactId) => {
      socket.join(contactId);
      console.log(`Socket ${socket.id} joined room: ${contactId}`);
    });

    socket.on("send_message", async ({ chatId, senderId, receiverId, message }, callback) => {
      try {
        const newMessage = {
          sender: senderId,
          text: message,
          timestamp: new Date()
        };

        await Chat.findByIdAndUpdate(chatId, {
          $push: { messages: newMessage },
          lastMessage: message
        });

        global._io.to(receiverId).emit("receive_message", {
          chatId,
          senderId,
          message: newMessage
        });

        if (callback) callback({ status: "ok" });
      } catch (err) {
        console.error("Socket send_message error:", err.message);
        if (callback) callback({ status: "error", error: err.message });
      }
    });

    socket.on("leave_room", (contactId) => {
      socket.leave(contactId);
      console.log(`Socket ${socket.id} left room: ${contactId}`);
    });

    socket.on("register_user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
        }
      }
    });
  });
}

module.exports = { setupSocket, onlineUsers };

