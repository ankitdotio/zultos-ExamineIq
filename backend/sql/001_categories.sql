CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,

    parent_id BIGINT
        REFERENCES categories(id)
        ON DELETE SET NULL,

    name VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_parent_id
    ON categories(parent_id);