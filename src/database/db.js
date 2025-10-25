
import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  // host: process.env.DATABASE_HOST|| "aws-0-us-east-1.pooler.supabase.com",
  // port: process.env.DATABASE_PORT || "6543",
  // database: process.env.DATABASE_NAME || "postgres",
  // user: process.env.DATABASE_USERNAME || "postgres.llwhgcmlpanhbgzkjznm",
  // pool_mode: "transaction",
  // password: process.env.DATABASE_PASSWORD,

    //connectionString: process.env.DATABASE_URL,
  host: "aws-1-eu-north-1.pooler.supabase.com",
  port: "6543",
  database: "postgres",
  user: "postgres.yuatnqikzrmwbkzjycyz",
  pool_mode: "transaction",
  password: "@Chimsyboy2275",
});

export default db;
