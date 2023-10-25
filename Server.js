require("dotenv").config();
const pool = require("./server/config/Database");
const express = require("express");
const cors = require("cors");
const userRouter = require("./server/api/Users/User.router");
const questionRouter = require("./server/api/questions/question.router");
const answerRouter = require("./server/api/answers/answer.router");
const app = express();
// const port = process.env.PORT;
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/Users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
