const fs = require('fs');
const pool = require('./connection.js');
const Factory = require('../models/class.js');

function readData(path) {
  const result = JSON.parse(fs.readFileSync(path, 'utf-8'));
  return result;
}

const labelsData = Factory.createLabels(readData('./data/labels.json'));
const songsData = readData('./data/songs.json');

const labelsQuery = `
  INSERT INTO "Labels"(name, since, city)
  VALUES
  ${labelsData.map((element) => {
    const { name, since, city } = element;
    return `('${name}', '${since}', '${city}')\n`;
  })}
`;

const songsQuery = `
  INSERT INTO "Songs"
  (title,"bandName",duration,genre,"createdDate",lyric,"imageUrl","totalVote","LabelId")
  VALUES
  ${songsData.map((song) => {
    const { title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId } = song;
    return `('${title}', '${bandName}', '${duration}', '${genre}', '${createdDate}', '${lyric}', '${imageUrl}', '${totalVote}', '${LabelId}')\n`;
  })}
`;

async function seeds(query) {
  try {
    await pool.query(query);
    console.log(`Seeds success!`);
  } catch (error) {
    console.error(error);
  }
}

seeds(labelsQuery);
seeds(songsQuery);
