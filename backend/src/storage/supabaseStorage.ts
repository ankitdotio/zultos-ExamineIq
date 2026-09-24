import { supabase } from "../db/supabase.js";

/**
 * Name of the Supabase Storage bucket.
 *
 * Create this bucket manually in Supabase:
 *
 * exam-documents
 *
 * Keep it PRIVATE.
 */
const BUCKET = "exam-documents";

/**
 * Upload a PDF to Supabase Storage.
 *
 * storagePath example:
 *
 * ssc/cgl/2026/8f7d8a....pdf
 */
export const uploadPdf = async (
  storagePath: string,
  pdfBuffer: Buffer,
): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, pdfBuffer, {
      contentType: "application/pdf",

      /**
       * Do not silently overwrite an existing document.
       *
       * We want duplicate detection to happen explicitly.
       */
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload PDF to Supabase: ${error.message}`);
  }

  return data.path;
};

export const storageBucket = BUCKET;
