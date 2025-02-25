const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'songLabel',
  connectionTimeoutMillis: 3000,
  idleTimeoutMillis: 300,
});

// async function connect(query) {
//   try {
//     const { rows: result } = await pool.query(query);
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// connect(`/dt`);

module.exports = pool;
