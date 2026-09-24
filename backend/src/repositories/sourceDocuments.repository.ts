import { getPool } from "../db/connection.js";

export interface CreateSourceDocumentInput {
  sourceId: number;
  examId?: number;
  url: string;
  title: string;
  documentType: string;
  storageBucket: string;
  storagePath: string;
  contentHash: string;
  extractedText: string;
}

export interface SourceDocument {
  id: number;
  source_id: number;
  exam_id: number | null;
  url: string;
  title: string;
  document_type: string;
  storage_bucket: string | null;
  storage_path: string | null;
  content_hash: string | null;
  extracted_text: string | null;
  extraction_status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  published_at: Date | null;
  fetched_at: Date;
  created_at: Date;
  updated_at: Date;
}

/**
 * Find a document by its source and URL.
 *
 * This is useful for determining whether we have already
 * processed this exact source URL.
 */
export const findSourceDocumentByUrl = async (
  sourceId: number,
  url: string,
): Promise<SourceDocument | null> => {
  const pool = getPool();

  const query = `
    SELECT
      id,
      source_id,
      exam_id,
      url,
      title,
      document_type,
      storage_bucket,
      storage_path,
      content_hash,
      extracted_text,
      extraction_status,
      published_at,
      fetched_at,
      created_at,
      updated_at
    FROM source_documents
    WHERE source_id = $1
      AND url = $2
    LIMIT 1;
  `;

  const result = await pool.query<SourceDocument>(query, [sourceId, url]);

  return result.rows[0] ?? null;
};

/**
 * Find a document by its SHA-256 content hash.
 *
 * This detects the same PDF being available at multiple URLs.
 */
export const findSourceDocumentByHash = async (
  contentHash: string,
): Promise<SourceDocument | null> => {
  const pool = getPool();

  const query = `
    SELECT
      id,
      source_id,
      exam_id,
      url,
      title,
      document_type,
      storage_bucket,
      storage_path,
      content_hash,
      extracted_text,
      extraction_status,
      published_at,
      fetched_at,
      created_at,
      updated_at
    FROM source_documents
    WHERE content_hash = $1
    LIMIT 1;
  `;

  const result = await pool.query<SourceDocument>(query, [contentHash]);

  return result.rows[0] ?? null;
};

/**
 * Create a new source document after the PDF has been
 * successfully downloaded, stored, and extracted.
 */
export const createSourceDocument = async (
  input: CreateSourceDocumentInput,
): Promise<SourceDocument> => {
  const pool = getPool();

  const query = `
    INSERT INTO source_documents (
      source_id,
      exam_id,
      url,
      title,
      document_type,
      storage_bucket,
      storage_path,
      content_hash,
      extracted_text,
      extraction_status
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      'COMPLETED'
    )
    RETURNING
      id,
      source_id,
      exam_id,
      url,
      title,
      document_type,
      storage_bucket,
      storage_path,
      content_hash,
      extracted_text,
      extraction_status,
      published_at,
      fetched_at,
      created_at,
      updated_at;
  `;

  const values = [
    input.sourceId,
    input.examId ?? null,
    input.url,
    input.title,
    input.documentType,
    input.storageBucket,
    input.storagePath,
    input.contentHash,
    input.extractedText,
  ];

  const result = await pool.query<SourceDocument>(query, values);

  return result.rows[0];
};
