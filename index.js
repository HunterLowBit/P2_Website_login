console.log("Esta funcionando");
console.log("http://localhost:8000");

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

app.get("/css/styles.css", (req, res) => {
  const filePath = path.join(__dirname, "public", "css", "styles.css");
  res.type("text/css"); // Define o tipo MIME como "text/css"
  res.sendFile(filePath);
});

app.listen(8000, () => {
  console.log("Servidor ouvindo na porta 8000");
});
