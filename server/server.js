const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../dist")));

// Handle SPA routing (redirect all non-file requests to index.html)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log("SERVER STARTED: Running on port", port);
  console.log("Serving static files from:", path.join(__dirname, "../dist"));
});
