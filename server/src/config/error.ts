import { ErrorRequestHandler } from "express";

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpError extends Error {
  constructor(
    public status: HttpCode,
    public msg: string,
    public feedback?: string,
    public route?: string
  ) {
    super(msg);
    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this);
  }
}

export const expressErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  _next
) => {
  if (err instanceof HttpError && !err.route) err.route = req.url;
  if (err instanceof HttpError) {
    console.log("%o", {
      status: err.status,
      message: err.message,
      route: err.route,
      feedback: err.feedback,
    });
  } else {
    console.log(err);
  }
  res
    .status((err as HttpError)?.status ?? 500)
    .send((err as HttpError | Error)?.message ?? "Internal server error");
};
