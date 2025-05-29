-- just for copy pasting into terminal
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passhash TEXT NOT NULL
);

INSERT INTO users(username, passhash) values ($1,$2);