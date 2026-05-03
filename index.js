const express = require("express");
const app = express();

app.use(express.json());

const VERIFY_TOKEN = "mmm";

// 🔹 Verification endpoint (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// 🔹 Receive messages (POST)
app.post("/webhook", (req, res) => {
  console.log("Webhook event:", JSON.stringify(req.body, null, 2));

  // Always respond 200
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on 3000"));
