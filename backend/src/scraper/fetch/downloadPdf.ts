// src/scraper/fetch/downloadPdf.ts

/**
 * Download a PDF and return it as a Buffer.
 *
 * The PDF is kept in memory temporarily.
 * The permanent copy will be stored in Supabase Storage.
 */
export const downloadPdf = async (url: string): Promise<Buffer> => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ExamineIQBot/1.0",
    },

    /**
     * PDF downloads may take longer than HTML pages.
     */
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(
      `PDF download failed: ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type");

  /**
   * Some websites incorrectly return generic content types.
   *
   * Therefore we don't reject solely based on content-type.
   * We will also verify the PDF signature below.
   */
  if (
    contentType &&
    !contentType.toLowerCase().includes("application/pdf") &&
    !contentType.toLowerCase().includes("application/octet-stream")
  ) {
    throw new Error(`Expected PDF but received ${contentType}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  /**
   * A valid PDF normally starts with:
   *
   * %PDF-
   *
   * This protects us from accidentally storing an HTML error page
   * returned with a misleading content type.
   */
  const header = buffer.subarray(0, 5).toString("ascii");

  if (header !== "%PDF-") {
    throw new Error(`Downloaded file is not a valid PDF: ${url}`);
  }

  return buffer;
};
