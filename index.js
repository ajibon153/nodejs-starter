const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "Haloo node" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// localhost:5000
