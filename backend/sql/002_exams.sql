CREATE TABLE IF NOT EXISTS exams (
    id BIGSERIAL PRIMARY KEY,

    category_id BIGINT NOT NULL
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    parent_id BIGINT
        REFERENCES exams(id)
        ON DELETE SET NULL,

    name VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    conducting_body VARCHAR(255),

    official_url TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);