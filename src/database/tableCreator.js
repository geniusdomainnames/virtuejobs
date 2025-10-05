import { Client } from "pg";

// Create a single client instance
const client = new Client({
  host: "aws-1-eu-north-1.pooler.supabase.com",
  port: "6543",
  database: "postgres",
  user: "postgres.yuatnqikzrmwbkzjycyz",
  pool_mode: "transaction",
  password: "@Chimsyboy2275",
});

export async function CreateJobsTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.DATABASE_TABLE} (
            job_id SERIAL PRIMARY KEY,
            job_source TEXT,
            job_source_link TEXT UNIQUE,
            job_source_add_date TEXT,
            job_field TEXT, 
            job_topic TEXT,
            job_company_name TEXT,
            job_company_description TEXT,
            job_title TEXT,
            job_location TEXT[],
            job_type TEXT[],
            job_industry TEXT,
            job_description TEXT[],
            job_short_description TEXT,
            job_salary TEXT,
            eligibility TEXT[],
            responsibilities TEXT[],
            how_to_apply TEXT[],
            application_deadline TEXT,
            apply_link TEXT,
            job_post_date TEXT,
            job_slog TEXT,
            job_country TEXT[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  try {
    // await client.connect();
    await client.query(createTableQuery);
    console.log("Jobs table created or already exists.");
  } catch (err) {
    console.error("Error creating jobs table:", err);
  }
}

export async function CreateCommentsTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.JOB_COMMENTS_TABLE} (
            comment_id SERIAL PRIMARY KEY,
            job_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_job
                FOREIGN KEY (job_id)
                REFERENCES ${process.env.DATABASE_TABLE}(job_id)
                ON DELETE CASCADE
        );
    `;

  try {
    await client.query(createTableQuery);
    console.log("Comments table created or already exists.");
  } catch (err) {
    console.error("Error creating comments table:", err);
  }
}

export async function CreateJobFieldsTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.JOB_FIELDS_TABLE}  (
            job_field_id SERIAL PRIMARY KEY,
            job_field_name TEXT UNIQUE
        );
    `;

  try {
    await client.query(createTableQuery);
    console.log("JobFields table created or already exists.");
  } catch (err) {
    console.error("Error creating jobFields table:", err);
  }
}

export async function CreateJobTypesTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.JOB_TYPES_TABLE}  (
            job_type_id SERIAL PRIMARY KEY,
            job_type_name TEXT UNIQUE
        );
    `;

  try {
    await client.query(createTableQuery);
    console.log("JobTypes table created or already exists.");
  } catch (err) {
    console.error("Error creating jobTypes table:", err);
  }
}

export async function CreateBlogTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.BLOG_TABLE} (
            post_id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL,
            excerpt TEXT,
            status VARCHAR(20) DEFAULT 'draft',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            keywords TEXT[],
            category TEXT,
            tags TEXT[],
            readtime INTEGER
        );
    `;

  try {
    await client.query(createTableQuery);
    console.log("Blog table created or already exists.");
  } catch (err) {
    console.error("Error creating blog table:", err);
  }
}

export async function CreateBlogCommentsTable() {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${process.env.BLOG_POST_COMMENTS_TABLE} (
            comment_id SERIAL PRIMARY KEY,
            post_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            comment TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_blog
                FOREIGN KEY (post_id)
                REFERENCES ${process.env.BLOG_TABLE}(post_id)
                ON DELETE CASCADE
        );
    `;

  try {
    await client.query(createTableQuery);
    console.log("Blog comments table created or already exists.");
  } catch (err) {
    console.error("Error creating blog comments table:", err);
  }
}

export async function CreateTables() {
  try {
    await client.connect();
   

    await CreateCommentsTable();
    await CreateJobsTable();
    await CreateBlogTable();
    await CreateBlogCommentsTable();
  } catch (err) {
    console.error("Error in CreateTables:", err);
  } finally {
    await client.end();
  }
}
