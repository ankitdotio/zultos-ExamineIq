// src/scraper/pipeline.ts
import { fetchRenderedPage } from "./fetch/fetchRenderedPage.js";
import { fetchPage } from "./fetch/fetchPage.js";
import { downloadPdf } from "./fetch/downloadPdf.js";

import { discoverLinks } from "./discovery/discoverLinks.js";

import { findPdfCandidates } from "./discovery/findPdfCandidates.js";

import { extractPdfText } from "./parser/extractPdfText.js";

import { uploadPdf, storageBucket } from "../storage/supabaseStorage.js";

import { sha256 } from "./utils/hash.js";

import { isAllowedUrl } from "./utils/isAllowedUrl.js";

import { sleep } from "./utils/sleep.js";

import type { SourceConfig } from "./source/source.types.js";

/**
 * Result returned after processing a PDF.
 *
 * We are not writing to Neon yet.
 * This makes the pipeline easy to test first.
 */
export interface ProcessedDocument {
  sourceId: string;

  sourceUrl: string;

  title: string;

  storageBucket: string;

  storagePath: string;

  contentHash: string;

  extractedText: string;
}

/**
 * Run the first-stage ingestion pipeline for a source.
 *
 * Current flow:
 *
 * source
 *   ↓
 * seed page
 *   ↓
 * fetch HTML
 *   ↓
 * discover links
 *   ↓
 * find PDF candidates
 *   ↓
 * download PDF
 *   ↓
 * hash PDF
 *   ↓
 * upload PDF
 *   ↓
 * extract text
 *
 * Neon persistence will be added after this works reliably.
 */
export const runSource = async (
  source: SourceConfig,
): Promise<ProcessedDocument[]> => {
  if (!source.enabled) {
    throw new Error(`Source "${source.id}" is disabled`);
  }

  const results: ProcessedDocument[] = [];

  /**
   * For the first implementation we process the seed URLs.
   *
   * We are deliberately NOT implementing recursive crawling yet.
   */
  for (const seedUrl of source.seedUrls) {
    /**
     * Security check.
     */
    if (!isAllowedUrl(seedUrl, source)) {
      throw new Error(`Seed URL is outside allowed domains: ${seedUrl}`);
    }

    console.log(`[SCRAPER] Fetching ${seedUrl}`);

    const html = await fetchRenderedPage(seedUrl);

    console.log(`[SCRAPER] Page fetched: ${html.length} characters`);

    const links = discoverLinks(html, seedUrl);

    console.log(`[SCRAPER] Discovered ${links.length} links`);

    /**
     * Only keep links belonging to the official
     * domains configured for this source.
     */
    const allowedLinks = links.filter((link) => isAllowedUrl(link.url, source));

    console.log(
      `[SCRAPER] ${allowedLinks.length} links are within allowed domains`,
    );

    const pdfCandidates = findPdfCandidates(allowedLinks);

    console.log(`[SCRAPER] Found ${pdfCandidates.length} PDF candidates`);

    /**
     * Respect the configured page/request limit.
     */
    const candidates = pdfCandidates.slice(0, source.crawl.maxDocumentsPerRun);

    for (const candidate of candidates) {
      try {
        console.log(`[SCRAPER] Processing PDF: ${candidate.url}`);

        /**
         * Respect crawl delay.
         */
        await sleep(source.crawl.delayMs);

        /**
         * Download the PDF.
         */
        const pdfBuffer = await downloadPdf(candidate.url);

        console.log(`[SCRAPER] Downloaded ${pdfBuffer.length} bytes`);

        /**
         * Generate a content hash.
         */
        const contentHash = sha256(pdfBuffer);

        console.log(`[SCRAPER] SHA-256: ${contentHash}`);

        /**
         * Store PDFs using their content hash.
         *
         * This gives us a deterministic storage key.
         */
        const storagePath = `${source.id}/${contentHash}.pdf`;

        /**
         * Upload the PDF.
         */
        try {
          await uploadPdf(storagePath, pdfBuffer);

          console.log(`[SCRAPER] Uploaded: ${storagePath}`);
        } catch (error) {
          /**
           * If the object already exists, that's not necessarily
           * a failure. It may simply mean we've already processed
           * this exact PDF.
           */
          const message =
            error instanceof Error ? error.message : String(error);

          if (!message.toLowerCase().includes("already exists")) {
            throw error;
          }

          console.log(`[SCRAPER] PDF already exists in storage`);
        }

        /**
         * Extract text from the PDF.
         */
        const extractedText = await extractPdfText(pdfBuffer);

        console.log(`[SCRAPER] Extracted ${extractedText.length} characters`);

        results.push({
          sourceId: source.id,

          sourceUrl: candidate.url,

          title: candidate.text || "Untitled document",

          storageBucket,

          storagePath,

          contentHash,

          extractedText,
        });
      } catch (error) {
        /**
         * One bad PDF should not stop the entire source run.
         *
         * Later this will go through Pino instead of console.error.
         */
        console.error(`[SCRAPER] Failed to process ${candidate.url}`, error);
      }
    }
  }

  return results;
};
