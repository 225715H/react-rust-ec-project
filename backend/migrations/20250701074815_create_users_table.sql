-- Add migration script here
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);