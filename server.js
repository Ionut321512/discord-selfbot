const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Pagina test
app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

app.listen(PORT, () => {
  console.log(`🌐 Server online pe portul ${PORT}`);
});

// Pornește botul
require("./index.js");
