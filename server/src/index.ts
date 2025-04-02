import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import env from "./config/environment";
import { expressErrorHandler } from "./config/error";
import merchantRouter from "./routes/merchant";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/merchant", merchantRouter);

app.use(expressErrorHandler);

app.set("port", env.SERVER_PORT);

app.listen(env.SERVER_PORT, () => {
  console.log(`Server started on port ${env.SERVER_PORT}`);
});
