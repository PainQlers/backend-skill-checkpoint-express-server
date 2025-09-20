import express from "express";
import answerRouter from "./routes/answer.mjs";
import questionRouter from "./routes/question.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions", answerRouter);
app.use("/questions", questionRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
