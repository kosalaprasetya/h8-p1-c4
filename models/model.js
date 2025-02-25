const pool = require('../connection/connection.js');
const Factory = require('./class.js');

class Model {
  static validation(title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate) {
    const errors = [];
    if (!bandName) {
      errors.push('bandName is required');
    }
    if (!genre) {
      errors.push('genre is required');
    }
    if (!LabelId) {
      errors.push('LabelId is required');
    }

    //title
    if (!title) {
      errors.push('title is required');
    } else if (title.length >= 100) {
      errors.push('maximum 100 character');
    } else if (title.split(' ').length < 2) {
      errors.push('title minimum is 2 words');
    }
    //duration
    if (!duration) {
      errors.push('duration is required');
    } else if (isNaN(duration)) {
      errors.push('duration must be numbers');
    } else if (+duration < 60) {
      errors.push('Minimum duration is 60 seconds');
    }
    //imgUrl
    if (!imageUrl) {
      errors.push(`imageUrl is required`);
    } else if (imageUrl.length > 50) {
      errors.push(`the image url maximum character is 50`);
    }
    //lyric
    if (!lyric) {
      errors.push(`lyric is required`);
    } else if (lyric.split('').length < 10) {
      errors.push(`minimum word in lyric is 10`);
    }
    //date
    const currentDate = new Date().toISOString().split('T')[0];
    if (!currentDate) {
      errors.push(`date is required!`);
    } else if (currentDate < createdDate) {
      errors.push(`maximum created date is today`);
    }

    return errors;
  }

  static async readLabels() {
    try {
      const { rows: data } = await pool.query(`SELECT * FROM "Labels"`);
      const result = Factory.createLabels(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async readLabelDetail() {
    try {
      const { rows: data } = await pool.query(`
      SELECT 
      l.id,
      l.name,
      l.since,
      l.city,
      COALESCE(CAST(AVG(s.duration) AS INT), 0) AS "AVG", 
      COALESCE(CAST(MIN(s.duration) AS INT), 0) AS "MIN", 
      COALESCE(CAST(MAX(s.duration) AS INT), 0) AS "MAX"
      FROM "Labels" l
      LEFT JOIN "Songs" s 
      ON l.id = s."LabelId"
      GROUP BY
      l.id,
      l.name,
      l.since,
      l.city
      ORDER BY
      AVG(s.duration) DESC
      `);
      const result = Factory.createLabelDetailDurations(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async readSongs(search) {
    try {
      let query = `
        SELECT id, title, "bandName", duration, genre, "totalVote" FROM "Songs"
        `;
      if (search) {
        query += `WHERE title ILIKE '%${search}%' \n`;
      }
      query += `ORDER BY "totalVote"`;
      console.log(query);
      const { rows: data } = await pool.query(query);
      const result = Factory.createSongs(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async readSongsId(id) {
    try {
      const { rows: data } = await pool.query(`
        SELECT "Songs".*, "Labels".name AS "LabelName" FROM "Songs"
        JOIN "Labels" ON "Songs"."LabelId" = "Labels".id
        WHERE
        "Songs".id = ${+id}
        `);
      const result = Factory.createSongDetails(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async addSong(title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate) {
    try {
      const errors = this.validation(title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate);
      if (errors.length > 0) {
        throw errors;
      }
      const query = `
      INSERT INTO "Songs"
      (title, "bandName", duration, genre, lyric, "imageUrl", "LabelId", "createdDate")
      VALUES
      ('${title}', '${bandName}', ${duration}, '${genre}', '${lyric}', '${imageUrl}', ${LabelId}, '${createdDate}')`;
      //await pool.query(query);
    } catch (error) {
      throw error;
    }
  }

  static async deleteSong(id) {
    try {
      const { rows: data } = await pool.query(`
        DELETE FROM "Songs"
        WHERE
        "Songs".id = ${+id}
        `);
      const result = Factory.createSongDetails(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateSong(id, title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate) {
    try {
      const errors = this.validation(title, bandName, duration, genre, lyric, imageUrl, LabelId, createdDate);
      if (errors.length > 0) {
        throw errors;
      }
      const query = `
      UPDATE "Songs"
      SET title = '${title}', "bandName" = '${bandName}', duration = ${duration}, genre = '${genre}', lyric = '${lyric}', "imageUrl" = '${imageUrl}', "LabelId" = ${LabelId}, "createdDate" = '${createdDate}'
      WHERE
      id = ${id}
      `;
      //await pool.query(query);
    } catch (error) {
      throw error;
    }
  }

  static async upVoteSong(id) {
    try {
      await pool.query(`
        UPDATE "Songs"
        SET "totalVote" = "totalVote" + 1
        WHERE
        "Songs".id = ${+id}
        `);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Model;
