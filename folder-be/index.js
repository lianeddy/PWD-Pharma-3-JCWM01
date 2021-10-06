const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3300;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.get("/", (req, res) => {
  res.status(200).send("<h4>integreted mysql</h4>");
});

// app.get("/users", (req, res) => {
//   let scriptQuery = 'Select * from users;'
//   db.query(scriptQuery, (err, results) => {
//     if (err) res.status(500).send(err)
//     res.status(200).send(results)
//   })
// });

app.post("/test", (req, res) => {
  console.log(req.body)
//   let insertQuery = `Insert into users values ()`
});

const { userRouter } = require("./routers");
const { db } = require("./database");
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("Hello");
});
