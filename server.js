const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const items = require("./routes/api/items");
const transactions = require("./routes/api/transactions");
const dividends = require("./routes/api/dividends");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const dashboard = require("./routes/api/dashboard");
const app = express();

//Body parser middleware

app.use(express.json());

// DB Config

const db = require("./config/keys").mongoURI;

// Connect to Mongo

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

app.use("/api/items", items);

app.use("/api/transactions", transactions);

app.use("/api/dividends", dividends);

app.use("/api/users", users);

app.use("/api/auth", auth);

app.use("/api/dashboard", dashboard);

//Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
