const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const PG_URI = process.env.POSTGRES_URI;

const pool = new Pool({
  connectionString: PG_URI,
  // user: 'fqcrysgb',
  // host: 'lallah.db.elephantsql.com',
  // database: 'fqcrysgb',
  // password: 'uRqZeJAveI2mtXhQDRlrYUHIDPRfhpTy',
  // port: 5432,
});

// const connectDB = async () => {
//   try {
//     await pool.connect();
//     console.log('Successfully connected to database');
//     console.log(res);
//     await pool.end();
//   } catch (error) {
//     console.log(error);
//   }
// };

// console.log('Starting database connection');
// connectDB();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  connectDB: async () => {
    try {
      await pool.connect();
      console.log('Successfully connected to database');
      // await pool.end();
    } catch (error) {
      console.log("AWWW SNAP COULDN'T CONNECT TO POSTGRES :(");
      console.log(error);
    }
  },
};
