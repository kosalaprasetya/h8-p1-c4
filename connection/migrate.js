const pool = require('./connection.js');

const dropTable = `
DROP TABLE IF EXISTS "Songs", "Labels";
`;

const createLabelsTableQuery = `
CREATE TABLE IF NOT EXISTS "Labels"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    since DATE DEFAULT CURRENT_DATE NOT NULL,
    city VARCHAR(20) NOT NULL
)
`;

const createSongsTableQuery = `
CREATE TABLE IF NOT EXISTS "Songs"(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    "bandName" VARCHAR(100) NOT NULL,
    duration INTEGER,
    genre VARCHAR(10),
    "createdDate" DATE DEFAULT CURRENT_DATE,
    lyric TEXT,
    "imageUrl" VARCHAR(150),
    "totalVote" INTEGER DEFAULT 0,
    "LabelId" INTEGER REFERENCES "Labels"(id)
)
`;

async function migrate() {
  try {
    await pool.query(dropTable);
    console.log(`Success drop tables`);

    await pool.query(createLabelsTableQuery);
    console.log(`Success create Table Labels`);

    await pool.query(createSongsTableQuery);
    console.log(`Success create Table Songs`);

    console.log(`Migrate Success!`);
  } catch (error) {
    console.error(error.message);
  }
}

migrate();
