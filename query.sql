-- =============================== USERS TABLE ===============================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,  -- or use username if preferred
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================== DATES TABLE (each date record is unique per user) ===============================

CREATE TABLE dates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    remarks TEXT,
    UNIQUE (user_id, date),  -- prevent duplicate date entries for same user
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================== TASKS TABLE ===============================

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date_id INTEGER REFERENCES dates(id) ON DELETE CASCADE,
    task_details TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',  -- pending, done, in-progress etc.
    priority INTEGER DEFAULT 3,  -- 1=High, 2=Medium, 3=Low
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
