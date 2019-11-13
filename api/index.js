const express = require("express");
const PORT = 2543;
var app = express();

app.listen(PORT, function() {
  console.log("Server Running on port " + PORT);
});
app.get("/testing", (req, res, next) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
