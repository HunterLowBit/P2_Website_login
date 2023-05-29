const express = require("express");
const app = express();
const { MessagingResponse } = require("twilio").twiml;
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.type("text/xml").send(twiml.toString());
});


app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000 (HTTP)\nhttp://localhost:3000");
});

