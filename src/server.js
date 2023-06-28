const express = require("express");
const app = express();
const server = require("http").Server(app);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const puerto = process.env.PORT || 3000;
server.listen(puerto, () => {
  console.log(`Conectado en el puerto http://localhost:${puerto}`);
});
