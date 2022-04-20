import { Server } from "socket.io";

const io = new Server(8080);

const simplePasswordAuthentication = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === "PasswordSDETest2022#") {
    next();
  } else {
    console.log("Authentication Failed", token);
    next(new Error("Authentication Failed!"));
  }
}

io.use(simplePasswordAuthentication);

io.on("connection", (socket) => {
  socket.emit("welcome", {name: 'socketio-simple'});

  socket.on("message", (message) => {
      socket.send(message.data);
  });
});