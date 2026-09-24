-- Categories

CREATE INDEX IF NOT EXISTS idx_categories_parent_id
    ON categories(parent_id);


-- Exams

CREATE INDEX IF NOT EXISTS idx_exams_category_id
    ON exams(category_id);

CREATE INDEX IF NOT EXISTS idx_exams_parent_id
    ON exams(parent_id);


-- Source pages

CREATE INDEX IF NOT EXISTS idx_source_pages_last_crawled
    ON source_pages(last_crawled_at);

CREATE INDEX IF NOT EXISTS idx_source_pages_content_hash
    ON source_pages(content_hash);


-- Source documents

CREATE INDEX IF NOT EXISTS idx_source_documents_exam_id
    ON source_documents(exam_id);

CREATE INDEX IF NOT EXISTS idx_source_documents_published_at
    ON source_documents(published_at);

CREATE INDEX IF NOT EXISTS idx_source_documents_content_hash
    ON source_documents(content_hash);


-- Exam events

CREATE INDEX IF NOT EXISTS idx_exam_events_exam_id
    ON exam_events(exam_id);

CREATE INDEX IF NOT EXISTS idx_exam_events_type
    ON exam_events(event_type);

CREATE INDEX IF NOT EXISTS idx_exam_events_starts_at
    ON exam_events(starts_at);