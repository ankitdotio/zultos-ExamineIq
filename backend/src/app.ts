import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import { errorHandler } from "./middleware/error/errorHandler.middleware";
import { env } from "./config/env";
import { globalLimiter } from "./utils/rateLimiter/rateLimiter";
import { httpLogger } from "./utils/logger/httpLogger";

export const app = express();
app.use(httpLogger);
app.use("/api", globalLimiter);
app.use(helmet());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Examine IQ API is healthy",
  });
});

// Routes will go here
// app.use("/api/v1/exams", examRoutes);

app.use(errorHandler);
