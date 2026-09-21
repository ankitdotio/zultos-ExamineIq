import { logger } from "./utils/logger/logger";

import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;
if (!PORT) {
  throw new Error("APP PORT IS NOT SET IN .ENV");
}

const server = app.listen(PORT, () => {
  logger.info(`APP IS LISTENING ON PORT - ${PORT}`);
});

const shutdown = (signal: string) => {
  logger.info({ signal }, "Shutdown signal received");

  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
