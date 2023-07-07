const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

app.get("/app/client", (req, res) => {
  res.render("client");
});

app.get("/app/admin", (req, res) => {
  res.render("admin");
});

io.on("connection", (socket) => {
  console.log("nuevo usuario conectado");

  socket.on("offer", (offer) => {
    console.log("new offer from ", socket.id);
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    console.log("new answer from ", socket.id);
    socket.broadcast.emit("answer", answer);
  });

  socket.on("icecandidate", (candidate) => {
    console.log("new ice candidate from ", socket.id);
    socket.broadcast.emit("icecandidate", candidate);
  });
});

const puerto = process.env.PORT || 8080;
server.listen(puerto, () => {
  console.log(`Conectado en el puerto http://localhost:${puerto}`);
});
