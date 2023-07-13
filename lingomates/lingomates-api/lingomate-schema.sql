CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL
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
    FOREIGN KEY (userId) REFERENCES users(id),
);

CREATE TABLE conversation(
    id SERIAL PRIMARY KEY,
    senderId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    messagedAt TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);

CREATE TABLE userConversation(
    id SERIAL PRIMARY KEY,
    conversationId INTEGER NOT NULL,
    user1 INTEGER NOT NULL,
    user2 INTEGER NOT NULL,
    FOREIGN KEY (user1) REFERENCES users(id),
    FOREIGN KEY (user2) REFERENCES users(id) FOREIGN KEY (conversationId) REFERENCES conversation(id)
);

CREATE TABLE directMessage(
    id SERIAL PRIMARY KEY,
    conversationId INTEGER NOT NULL,
    senderId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    messageText TEX FOREIGN KEY (conversationId) REFERENCES conversation(id),
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);