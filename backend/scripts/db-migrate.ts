import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { closePool, getPool } from "../src/db/connection.js";

async function main() {
  const file = process.argv[2];
  const sql = readFileSync(resolve(process.cwd(), file), "utf-8");
  const pool = getPool();
  await pool.query(sql);
  console.log(`MIGRATED : ${file}`);
  await closePool();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
