import { runSource } from "../src/scraper/pipeline.js";

import { sscSource } from "../src/scraper/source/registry.js";

/**
 * Manual development runner.
 *
 * This lets us test the ingestion pipeline without
 * exposing it through an HTTP endpoint.
 */
const main = async (): Promise<void> => {
  console.log("========================================");

  console.log("Examine IQ Scraper Test");

  console.log("========================================");

  try {
    const results = await runSource(sscSource);

    console.log(`Successfully processed ${results.length} documents`);

    for (const result of results) {
      console.log("\n----------------------------------------");

      console.log(`Title: ${result.title}`);

      console.log(`Source: ${result.sourceUrl}`);

      console.log(`Bucket: ${result.storageBucket}`);

      console.log(`Path: ${result.storagePath}`);

      console.log(`Hash: ${result.contentHash}`);

      console.log(`Extracted characters: ${result.extractedText.length}`);
    }
  } catch (error) {
    console.error("Scraper failed:", error);

    process.exitCode = 1;
  }
};

await main();
