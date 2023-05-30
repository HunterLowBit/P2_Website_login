const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const secretKey = "seu_segredo_aqui";

// Criação e conexão com o banco de dados SQLite
const db = new sqlite3.Database(":memory:"); // ou substitua por um caminho para um arquivo

// Cria tabela de usuários
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
  );
  db.run(
    "INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123456')"
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no servidor" });
        return;
      }

      if (row) {
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
      } else {
        res.status(401).json({ error: "Credenciais inválidas" });
      }
    }
  );
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
