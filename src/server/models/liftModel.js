const { Pool, Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const PG_URI = process.env.POSTGRES_URI;
const pool = new Pool({
  connectionString: PG_URI,
});

const connectDB = async () => {
  try {
    await pool.connect()
    console.log('Successfully connected to database');
    console.log(res)
    await pool.end()
  } catch (error) {
    console.log(error)
  }
};
console.log('Starting database connection');
connectDB();

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
