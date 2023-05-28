console.log("Esta funcionando");
console.log("http://localhost:8000");

const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "dist", "index.html");
  res.sendFile(filePath);
});

app.listen(8000, () => {
  console.log("Servidor ouvindo na porta 8000");
});

