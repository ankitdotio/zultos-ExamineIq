CREATE TABLE IF NOT EXISTS source_pages (
    id BIGSERIAL PRIMARY KEY,

    source_id BIGINT NOT NULL
        REFERENCES sources(id)
        ON DELETE CASCADE,

    url TEXT NOT NULL,

    page_type VARCHAR(100) NOT NULL,

    last_crawled_at TIMESTAMPTZ,

    content_hash CHAR(64),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(source_id, url)
);