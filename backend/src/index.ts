import { logger } from "./utils/logger/logger.js";

import { app } from "./app.js";
import { env } from "./config/env.js";
import { closePool } from "./db/connection.js";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(`APP IS LISTENING ON PORT - ${PORT}`);
});

const shutdown = (signal: string) => {
  logger.info({ signal }, "Shutdown signal received");

  server.close(async () => {
    logger.info("HTTP SERVER CLOSED");

    await closePool();
    logger.info("DATABASE POOL CLOSED");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
