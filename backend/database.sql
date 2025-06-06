-- just for copy pasting into terminal, 
-- add state and first/last name later
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passhash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    state_name TEXT NOT NULL
);

INSERT INTO users(email, passhash) values ($1,$2);