import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import env from "./config/environment";
import { expressErrorHandler, HttpCode, HttpError } from "./config/error";
import merchantRouter from "./routes/merchant";
import userRouter from "./routes/user";
import bankRouter from "./routes/bank";
import upiRouter from "./routes/upi";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      const err = new HttpError(
        HttpCode.FORBIDDEN,
        "The CORS policy for this site does not " +
          "allow access from the specified origin."
      );
      if (!origin) return callback(null, true);
      if (origin != env.FRONTEND_URL) {
        console.log("CORS policy not allowed for origin: " + origin);
        return callback(err, false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use("/merchant", merchantRouter);
app.use("/user", userRouter);
app.use("/bank", bankRouter);
app.use("/upi", upiRouter);

app.use(expressErrorHandler);

app.set("port", env.SERVER_PORT);

app.listen(env.SERVER_PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${env.SERVER_PORT}`);
});
