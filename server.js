const express = require("express");
const mongooose = require("mongoose");
const config = require("config");

const app = express();

//Bodyparser middleware

app.use(express.json());

// DB Config
const db = config.get("mongoURI");

//connect to db
mongooose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

//use routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// server static process if in production
if (process.env.NODE_ENV) {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server started on port" + port);
});
