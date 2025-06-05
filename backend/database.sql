-- just for copy pasting into terminal, 
-- add state and first/last name later
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passhash TEXT NOT NULL
);

INSERT INTO users(email, passhash) values ($1,$2);