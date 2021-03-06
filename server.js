const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const app = express();
const getConnection = require("./config/db");
const userRouter = require("./router/userRouter");

//registering middlewares
dotEnv.config();

//connecting to db
getConnection();
app.use(express.json());
app.use(cors());

//registering routes
app.use("/users", userRouter);
app.get("/", (req, res) => res.send("Api is running"));

//listening to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
