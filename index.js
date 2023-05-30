const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const secretKey = "seu_segredo_aqui";

// Criação e conexão com o banco de dados SQLite
const db = new sqlite3.Database("database.db"); // ou substitua pelo caminho para o arquivo do banco de dados

// Cria tabela de usuários
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, email TEXT, senha TEXT)"
  );

  // Insere o usuário 'admin' no banco de dados com a senha criptografada
  const password = "123456";
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    db.run("INSERT OR IGNORE INTO usuarios (email, senha) VALUES (?, ?)", [
      "admin",
      hash,
    ]);
  });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no servidor" });
      return;
    }

    if (row) {
      bcrypt.compare(senha, row.senha, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Erro no servidor" });
          return;
        }

        if (result) {
          const token = jwt.sign({ email }, secretKey);
          res.json({ token });
        } else {
          res.status(401).json({ error: "Credenciais inválidas" });
        }
      });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { email, senha } = req.body;

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no servidor" });
      return;
    }

    db.run(
      "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
      [email, hash],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Erro no servidor" });
          return;
        }

        res.json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000 (HTTP)\nhttp://localhost:3000");
});
