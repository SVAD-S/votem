import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import electionRouter from "./routes/electionRoute.js";
import userRouter from "./routes/userRouter.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/middlewares.js";
import sendEmail from "./utils/sendEmail.js";

const app = express();
app.use(
  cors({
    origin: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();

app.get("/", function (req, res) {
  res.json("Works!");
});

app.use("/api", electionRouter);
app.use("/api/voter", userRouter);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
