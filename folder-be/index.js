const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3300;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bearerToken());
const { userRouter, adminRouter, productRouter } = require("./routers");

app.get("/", (req, res) => {
  res.status(200).send("<h4>integreted mysql</h4>");
});
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server Runnin on PORT: ${PORT}`);
});
