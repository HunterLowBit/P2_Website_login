const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const secretKey = "seu_segredo_aqui";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      res.json({ message: "Acesso autorizado!", user: decoded });
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  } else {
    res.status(401).json({ error: "Token não fornecido" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000 (HTTP)\nhttp://localhost:3000");
});
