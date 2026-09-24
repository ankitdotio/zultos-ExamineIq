// src/scraper/utils/hash.ts

import crypto from "node:crypto";

/**
 * Generate a SHA-256 hash for a Buffer.
 *
 * We use this to detect whether two downloaded documents
 * contain exactly the same bytes.
 */
export const sha256 = (buffer: Buffer): string => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};
