const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const messageRoutes = require("./routes/messages");
const usersRoutes = require("./routes/users");
const httpProxy = require('http-proxy');
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());
const proxy = httpProxy.createProxyServer();

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/webApp-chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('Hello World!');
});

// Socket.IO implementation
io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // Add user to online users map
  global.onlineUsers.set(socket.id, { id: socket.id });

  // Send a welcome message to the new user
  socket.emit("messageResponse", {
    message: `Welcome to the chat room, ${socket.id}!`,
    sender: "Server",
    timestamp: new Date(),
  });

  // Broadcast to all users that a new user has joined
  socket.broadcast.emit("messageResponse", {
    message: `${socket.id} has joined the chat`,
    sender: "Server",
    timestamp: new Date(),
  });

  // Send chat message to all users
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  // Remove user from online users map when they disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    global.onlineUsers.delete(socket.id);

    // Broadcast to all users that the user has left
    socket.broadcast.emit("messageResponse", {
      message: `${socket.id} has left the chat`,
      sender: "Server",
      timestamp: new Date(),
    });
  });
});

io.use((socket, next) => {
  socket.handshake.headers.origin = "http://localhost:3000";
  // update the corsOptions to include the origin
  const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  };
  cors(corsOptions)(socket.request, socket.request.res, next);
});

// Use the cors middleware for Socket.IO
// io.origins((origin, callback) => {
//   if (origin !== "http://127.0.0.1:3001") {
//     return callback("origin not allowed", false);
//   }
//   callback(null, true);
// });

server.listen(3001, () => console.log("Server started on port 3001"));
