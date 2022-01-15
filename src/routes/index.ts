import express from "express";
import path from "path";
import cors from "cors";

import * as config from "../config";
import NotFoundHandler from "../controllers/notFoundHandler";
import GlobalErrorHandler from "../controllers/globalErrorHandler";

// Routes
import CertificateRoute from "./certificate";
import { checkAuthToken } from "../core/middlewares/check-auth-token";

const app = express();

app.disable("x-powered-by");
app.enable("case sensitive routing");
app.disable("strict routing");

app.use(
  cors((_req, cb) => {
    cb(null, {
      origin: true,
      credentials: true,
    });
  })
);

app.use(express.json());

// Application Specific Routes
app.get("/", (_, res) => res.send("¯¯\\__(ツ)__/¯¯"));

app.use("/static", express.static(path.join(__dirname, "../assets")));

app.use("/certificates", checkAuthToken, CertificateRoute);

// 404 Error
app.use(NotFoundHandler);

// Global Error Handler
app.use(GlobalErrorHandler);

export default app;
