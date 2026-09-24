CREATE TYPE IF NOT EXISTS exam_event_type AS ENUM (
    'APPLICATION_OPEN',
    'APPLICATION_CLOSE',
    'EXAM_DATE',
    'POSTPONED',
    'RESCHEDULED',
    'ADMIT_CARD',
    'ANSWER_KEY',
    'RESULT',
    'COUNSELLING',
    'RE_EXAMINATION',
    'CORRECTION_WINDOW',
    'VACANCY_UPDATE',
    'OTHER'
);

CREATE TABLE IF NOT EXISTS exam_events (
    id BIGSERIAL PRIMARY KEY,

    exam_id BIGINT NOT NULL
        REFERENCES exams(id)
        ON DELETE CASCADE,

    event_type exam_event_type NOT NULL,

    title VARCHAR(255),

    description TEXT,

    starts_at TIMESTAMPTZ,

    ends_at TIMESTAMPTZ,

    source_document_id BIGINT
        REFERENCES source_documents(id)
        ON DELETE SET NULL,

    source_url TEXT,

    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (
        ends_at IS NULL
        OR starts_at IS NULL
        OR ends_at >= starts_at
    )
);