CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- SUBJECT ENUM
-- =========================================

CREATE TYPE subject_enum AS ENUM
('physics', 'chemistry', 'maths', 'biology');

-- =========================================
-- PAPERS TABLE
-- =========================================

CREATE TABLE papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    storage_path TEXT,
    std VARCHAR(10),
    paper_type VARCHAR(50),
    total_marks INT,
    duration_mins INT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- QUESTIONS TABLE
-- =========================================

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    paper_id UUID REFERENCES papers(id)
    ON DELETE CASCADE,

    q_number INT NOT NULL,

    subject subject_enum NOT NULL,

    stem_text TEXT,

    latex_blocks JSONB DEFAULT '[]',

    has_image BOOLEAN DEFAULT FALSE,

    marks INT DEFAULT 4,

    negative NUMERIC DEFAULT -1,

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(paper_id, q_number)
);

-- =========================================
-- OPTIONS TABLE
-- =========================================

CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id UUID REFERENCES questions(id)
    ON DELETE CASCADE,

    label CHAR(1) NOT NULL
    CHECK (label IN ('a','b','c','d')),

    text_plain TEXT,

    latex_blocks JSONB DEFAULT '[]',

    is_correct BOOLEAN DEFAULT FALSE,

    UNIQUE(question_id, label)
);

-- =========================================
-- IMAGES TABLE
-- =========================================

CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id UUID REFERENCES questions(id)
    ON DELETE CASCADE,

    storage_path TEXT NOT NULL,

    bbox JSONB,

    image_type VARCHAR(50)
);

-- =========================================
-- RAW EXTRACTIONS TABLE
-- =========================================

CREATE TABLE raw_extractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    paper_id UUID REFERENCES papers(id)
    ON DELETE CASCADE,

    raw_markdown TEXT NOT NULL,

    extracted_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- PROCESSING JOBS TABLE
-- =========================================

CREATE TABLE processing_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    paper_id UUID REFERENCES papers(id),

    status VARCHAR(20) DEFAULT 'pending',

    progress VARCHAR(100),

    error_log TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);