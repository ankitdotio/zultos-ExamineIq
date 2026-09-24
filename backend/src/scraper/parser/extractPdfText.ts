import { PDFParse } from "pdf-parse";

/**
 * Extract plain text from a PDF buffer.
 *
 * This function does not know anything about:
 * - Supabase
 * - Neon
 * - exams
 * - AI
 *
 * Its only responsibility is PDF -> text.
 */
export const extractPdfText = async (pdfBuffer: Buffer): Promise<string> => {
  const parser = new PDFParse({
    data: pdfBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  const text = result.text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();

  if (!text) {
    throw new Error("PDF text extraction produced empty text");
  }

  return text;
};
