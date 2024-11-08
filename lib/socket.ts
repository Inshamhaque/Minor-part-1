// socket.js
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*", // Change this to your frontend's URL in production
    methods: ["GET", "POST"],
  },
});

const initSocket = (httpServer) => {
  io.attach(httpServer);

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    });

    socket.on("sendMessage", (data) => {
      // Publish message to Redis
      io.to(data.room).emit("receiveMessage", data);
      console.log(`Message sent to ${data.room}:`, data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export { initSocket, io };
