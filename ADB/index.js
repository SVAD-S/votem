import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/middleware.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/adb/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = 5050;

app.listen(PORT, () => console.log(`server up at ${PORT}`));
