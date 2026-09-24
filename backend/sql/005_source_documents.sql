CREATE TYPE IF NOT EXISTS extraction_status_type AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);

CREATE TABLE IF NOT EXISTS source_documents (
    id BIGSERIAL PRIMARY KEY,

    source_id BIGINT NOT NULL
        REFERENCES sources(id)
        ON DELETE CASCADE,

    exam_id BIGINT
        REFERENCES exams(id)
        ON DELETE SET NULL,

    url TEXT NOT NULL,

    title TEXT NOT NULL,

    document_type VARCHAR(100) NOT NULL,

    storage_bucket VARCHAR(100),

    storage_path TEXT,

    content_hash CHAR(64),

    extracted_text TEXT,

    extraction_status extraction_status_type NOT NULL
        DEFAULT 'PENDING',

    published_at TIMESTAMPTZ,

    fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(source_id, url)
);