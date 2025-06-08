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

CREATE TABLE stockOwnership (
    userid INTEGER NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    amountowned NUMERIC(12, 2) NOT NULL,
    notes VARCHAR(255),
    PRIMARY KEY (userid, ticker),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO users(email, passhash) values ($1,$2);