import { Pool } from "pg";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), "./config/.env") });

let pool: Pool | null = null;
/**
 * - creates the pool connection
 * @returns Pool
 */
export const getPool = (): Pool => {
  if (!pool) {
    const connectionString = process.env.DB_URL;

    if (!connectionString) {
      throw new Error("DB CONNECTION STRING NOT SET IN .ENV");
    }
    pool = new Pool({ connectionString });
  }
  return pool;
};

/**
 * - ends the pool connections
 * - makes pool null
 */
export const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};
