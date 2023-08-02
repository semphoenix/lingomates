CREATE TABLE users(
    id             SERIAL PRIMARY KEY,
    first_name     TEXT NOT NULL,
    last_name      TEXT NOT NULL,
    email          TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    username       TEXT NOT NULL, 
    password       TEXT NOT NULL,
    profilePicture TEXT,
    nativeLanguage TEXT NOT NULL
);

CREATE TABLE lingua(
    id SERIAL PRIMARY KEY,
    linguaName TEXT NOT NULL,
    countryFlag VARCHAR(255),
    imageUrl VARCHAR(255)
);

CREATE TABLE userLingua(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    linguaId INTEGER NOT NULL,
    proficiencyLevel TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (linguaId) REFERENCES lingua(id)
);

CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE conversation(
    id SERIAL PRIMARY KEY,
    roomConvo VARCHAR NOT NULL UNIQUE 
);

CREATE TABLE userConversation(
    id SERIAL PRIMARY KEY,
    room VARCHAR NOT NULL,
    user1 INTEGER NOT NULL,
    user2 INTEGER NOT NULL,
    FOREIGN KEY (user1) REFERENCES users(id),
    FOREIGN KEY (user2) REFERENCES users(id),
    FOREIGN KEY (room) REFERENCES conversation(roomConvo)
);

CREATE TABLE directMessage(
    id SERIAL PRIMARY KEY,
    room VARCHAR NOT NULL,
    senderId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    messageText TEXT NOT NULL, 
    translatedText TEXT NOT NULL, 
    messaged_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (room) REFERENCES conversation(roomConvo),
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);