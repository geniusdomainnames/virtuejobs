import db from "./db.js";
import { Job } from "../utils/jobs.js";
const jobTable = process.env.DATABASE_TABLE;

export class DatabaseFunctions {
  static async checkIfJobExists(fieldname, fieldValue) {
    try {
      const query = `SELECT 1 FROM ${jobTable} WHERE ${fieldname} = $1 LIMIT 1`;
      const values = [fieldValue];

      const result = await db.query(query, values);

      return result.rows.length > 0;
    } catch (error) {
      console.error("Error checking if job exists:", error);
      return false; // You might also throw the error depending on your use case
    }
  }

  static async InsertJobTypes() {
    const jobTypes = [
      "Full-time",
      "Part-time",
      "Contract",
      "Temporary",
      "Internship",
      "Freelance",
      "Per Diem",
      "Seasonal",
      "Remote",
      "On-site",
      "Hybrid",
      "Day Shift",
      "Night Shift",
      "Weekend Shift",
      "Flexible Hours",
      "Rotational Shift",
      "Entry-Level",
      "Mid-Level",
      "Senior-Level",
      "Manager",
      "Director",
      "Executive",
      "Volunteer",
      "Apprenticeship",
      "Commission-Based",
      "Gig",
    ];

    const insertQuery = `
        INSERT INTO ${process.env.JOB_TYPES_TABLE} (job_type_name)
        VALUES ($1)
        ON CONFLICT (job_type_name) DO NOTHING;
    `;

    try {
      for (const type of jobTypes) {
        await db.query(insertQuery, [type]);
      }

      console.log("Job types inserted successfully.");
    } catch (err) {
      console.error("Error inserting job types:", err);
    }
  }

  static async InsertJobFields() {
    const jobFields = [
      "Administration / Secretarial / Personal Assistant (PA) / Clerical / Office Assistant",
      "Advertising / Branding / Public Relation (PR)",
      "Agriculture / Agro-Allied / Farming",
      "Architectural / Designing / Surveying",
      "Artisan / Labour / Factory Work / Craftsmen / Vocational / Semi-Skilled",
      "Arts / Craft / Creatives",
      "Automobile Services / Car Painting / Car Mechanic / Car Electrician / Car Panel Beater / Car Upholstery",
      "Aviation / Airline Services / Air Hostess / Pilot / Captain / Aircraft Engineer",
      "Biological Sciences - Biochemistry / Microbiology / Plant Science / Environmental",
      "Caregiver / Nanny / Domestic Help",
      "Cashiers / Tellers / Ticketing",
      "Chaplain / Pastoral / Reverend / Ministration",
      "Cleaning / Janitorial / Laundry",
      "Computer",
      "Computer / Cloud Computing / Data Warehousing / Amazon Web Services (AWS)",
      "Computer / Database Support / Database Admin / Database Development / Oracle / MySQL",
      "Computer / Frontend Design / UI / UX / Frontend Scripting / Javascript / React / JQuery",
      "Computer / Full Stack Software Development / Frontend & Backend / Web Design & Development",
      "Computer / Graphics Design / Artist",
      "Computer / Mobile App Development / Android / IOS / Games / React Native / Flutter",
      "Computer / Network & Hardware Engineering Support / Network Design and Security",
      "Computer / System Admin / Software Support / Windows Admin / Linux Admin",
      "Consulting / Business Strategy / Planning",
      "Cook / Chef / Baker / Pastry Chef / Steward",
      "Customer Service / Call Centre / Front Desk / Receptionist",
      "Data Entry / Analysis",
      "Digital Marketing / Social Media Management",
      "Driving / Haulage / Dispatch Rider / Bike Rider / Chauffeur",
      "Economics / Statistics / Data Science",
      "Education - Higher Institution / Teaching / Lecturing / Training",
      "Education - Non Academic / Registrar / Bursary / Admin / Librarian",
      "Education - Sec/Pri/Creche / Teaching / Tutoring / Creche Services",
      "Election Personnel / Ad-hoc Officers",
      "Engineering",
      "Engineering - Biomedical Engineering",
      "Engineering - Chemical / Petroleum / Petrochemical",
      "Engineering - Civil / Construction / Building",
      "Engineering - Electrical / Electronics / Telecom",
      "Engineering - Mechanical / Metallurgical / Mechatronics",
      "Environmental Services",
      "Executive / Top Management",
      "Facility Management / Estate Management / Maintenance",
      "Fashion Design / Beauty Care / Make-up / Tailoring / Hair Stylist",
      "Finance / Accounting / Audit / Tax",
      "Food & Nutrition / Dietetics / Food Technology",
      "Furniture Design / Carpentery",
      "Graduate Trainee / Fresh Graduate / Graduate Internship",
      "Horticulture / Beautification / Gardening",
      "Hospitality / Travel & Tourism / Hotel / Restuarant / Catering / Museum / Club / Bar / Tour Guide",
      "HSE / Safety & Risk Management / Compliance",
      "Human Resources / Recruitment",
      "Insurance / Assurance / Actuary",
      "Internship / SIWES / Industrial Training",
      "Language Translation / Transcribing / Interpreting",
      "Law / Legal",
      "Logistics / Procurement / Purchasing / Supply Chain",
      "Maritime Services / Shipping / Clearing & Forwarding / Marine Officer / Seamen",
      "Marketing / Sales / Business Development / Merchandiser",
      "Media / Broadcasting / Journalism / Content Writing / Editing",
      "Medical",
      "Medical - Anatomy / Physiology / Pathology / Basic Medical Science",
      "Medical - Dental / ENT",
      "Medical - Health Information / Medical Records / Health Management",
      "Medical - Nursing & Midwifery",
      "Medical - Optometrist / Ophtalmologist",
      "Medical - Pharmaceutical",
      "Medical - Physician / Medical Officer / Doctor / Consultants / Medical Internship",
      "Medical - Physiotherapy / Massage Therapy / Masseuse / Masseur",
      "Medical - Public Health Worker / Hospital Attendant / Orderly",
      "Medical - Veterinary Medicine",
      "Medical Laboratory / Radiography / Sonography",
      "Modelling / Ushering Services / Runway Services",
      "Monitoring and Evaluation / Social Worker",
      "Multimedia / Film Production / Photograhpy / Cinematography / Video & Audio Edtiting",
      "Music Entertainment / Comedy / Disc Jockey (DJ) / Master of Ceremony (MC)",
      "Operations / Project Management",
      "Physical Sciences - Chemistry / Physics / Geography / Earth Science (Geology) / Material Science / Astronomy",
      "Psychology / Clinical Psychology",
      "Quality Assurance (QA) / Quality Control (QC)",
      "Remote / Freelance / Work at home",
      "Research / Survey",
      "Scholarship / Grant / Competition",
      "Security - Guard / Gateman",
      "Security - Military / Police / Civil Defence / Para-Military",
      "Security - Professional / Public / Corporate Security Management",
      "Sports / Fitness / Gym Instructor",
      "Store-Keeping & Warehousing",
      "Technician - Electrical / Electrician",
      "Technician - Fitter / Plumber / Welder / Panel Beater / Scaffolder",
      "Technician - Mechanical / Mechanic / Generator Technician",
      "Tender / Bid / Quotation / Proposal / Expression of Interest",
      "Waiter / Waitress / Concierge / Room Attendant",
    ];

    const insertQuery = `
        INSERT INTO ${process.env.JOB_FIELDS_TABLE} (job_field_name)
        VALUES ($1)
        ON CONFLICT (job_field_name) DO NOTHING;
    `;

    try {
      for (const field of jobFields) {
        await db.query(insertQuery, [field]);
      }

      console.log("Job fields inserted successfully.");
    } catch (err) {
      console.error("Error inserting job fields:", err);
    }
  }

  static async SaveJob(job) {
    const insertQuery = `
    INSERT INTO ${process.env.DATABASE_TABLE} (
      job_source,
      job_source_link,
      job_source_add_date,
      job_field,
      job_topic,
      job_company_name,
      job_company_description,
      job_title,
      job_location,
      job_type,
      job_industry,
      job_description,
      job_short_description,
      job_salary,
      eligibility,
      responsibilities,
      how_to_apply,
      application_deadline,
      apply_link,
      job_post_date,
      job_slog,
      job_country
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20,
      $21, $22
    )
    RETURNING *;
  `;

    try {
      const values = job.toInsertArray();
      const result = await db.query(insertQuery, values);
      return result.rows[0];
    } catch (error) {
      console.log("Error inserting job:", error.message);
      throw error;
    }
  }

  static async getAllJobs() {
    // Defensive: if DATABASE_TABLE is not set, avoid running a malformed query
    if (!process.env.DATABASE_TABLE) {
      console.warn("DATABASE_TABLE environment variable is not set. getAllJobs() will return an empty array.");
      return [];
    }

    const query = `SELECT * FROM ${process.env.DATABASE_TABLE} ORDER BY job_id DESC;`;

    try {
      const result = await db.query(query);
      return result.rows.map((row) => new Job(row));
    } catch (error) {
      console.error("Error retrieving jobs:", error.message);
      throw error;
    }
  }

  static async getJobById(jobId) {
    const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE job_id = $1;`;

    try {
      const result = await db.query(query, [jobId]);

      if (result.rows.length === 0) {
        return null; // Or throw an error if preferred
      }

      return new Job(result.rows[0]);
    } catch (error) {
      console.error(`Error retrieving job with ID ${jobId}:`, error.message);
      throw error;
    }
  }

  static async getSimilarJobs(jobIndustry) {
    const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE job_industry = $1;`;

    try {
      const result = await db.query(query, [jobIndustry]);

      if (result.rows.length === 0) {
        return []; // Or throw an error if preferred
      }

      return result.rows.map((row) => new Job(row));
    } catch (error) {
      console.error(
        `Error retrieving jobs in the industry ${jobIndustry}:`,
        error.message
      );
      throw error;
    }
  }

  static async getJobBySlug(job_slug) {
    const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE job_slog = $1;`;

    try {
      const result = await db.query(query, [job_slug]);

      if (result.rows.length === 0) {
        return {
          message: "Job not found",
          success: false,
          error: true,
        };
      }

      return new Job(result.rows[0]);
    } catch (error) {
      console.error(`Error retrieving job with ID ${job_slug}:`, error.message);
      throw error;
    }
  }

  static async InsertComment(job_id, name, email, comment) {
    const insertQuery = `
            INSERT INTO ${process.env.JOB_COMMENTS_TABLE} (job_id, name, email, comment)
            VALUES ($1, $2, $3, $4);
        `;

    try {
      await db.query(insertQuery, [job_id, name, email, comment]);
      return {
        success: true,
        error: false,
        message: "Comment inserted.",
      };
    } catch (err) {
      return {
        success: false,
        error: true,
        message: "Comment not inserted.",
      };
    }
  }
  static async GetCommentsByJobId(job_id) {
    const selectQuery = `
            SELECT comment_id, job_id, name, email, comment, created_at
            FROM ${process.env.JOB_COMMENTS_TABLE}
            WHERE job_id = $1
            ORDER BY created_at DESC;
        `;

    try {
      const result = await db.query(selectQuery, [job_id]);
      return result.rows; // returns an array of comment objects
    } catch (err) {
      console.error("Error fetching comments:", err);
      return []; // return empty array if there's an error
    }
  }


  static async InsertBlogComment(post_id, name, email, comment) {
    // First verify if the post exists
    const checkPostQuery = `
      SELECT 1 FROM ${process.env.BLOG_TABLE} WHERE post_id = $1;
    `;

    try {
      // Check if post exists
      const postCheck = await db.query(checkPostQuery, [post_id]);
      if (postCheck.rows.length === 0) {
        return {
          success: false,
          error: true,
          message: "Blog post not found.",
        };
      }

      // Insert the comment
      const insertQuery = `
        INSERT INTO ${process.env.BLOG_POST_COMMENTS_TABLE} (post_id, name, email, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const result = await db.query(insertQuery, [post_id, name, email, comment]);
      
      return {
        success: true,
        error: false,
        message: "Comment inserted successfully.",
        data: result.rows[0]
      };
    } catch (err) {
      console.error("Error inserting blog comment:", err);
      return {
        success: false,
        error: true,
        message: `Failed to insert comment: ${err.message}`,
      };
    }
  }

  static async GetBlogCommentsByPostId(post_id) {
    const selectQuery = `
            SELECT comment_id, post_id, name, email, comment, created_at
            FROM ${process.env.BLOG_POST_COMMENTS_TABLE}
            WHERE post_id = $1
            ORDER BY created_at DESC;
        `;

    try {
      const result = await db.query(selectQuery, [post_id]);
      return result.rows; // returns an array of comment objects
    } catch (err) {
      console.error("Error fetching comments:", err);
      return []; // return empty array if there's an error
    }
  }



  static async GetLocationResults(
    usercountry,
    selectedsearchparameter,
    selectsearchparametervalue,
    limit,
    offset
  ) {
    let query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${usercountry}' ILIKE ANY (job_country)`;
    let queryParams = [limit, offset];
    let whereClause = "";

    if (selectedsearchparameter && selectsearchparametervalue) {
      let table_column_name = "";

      switch (selectedsearchparameter) {
        case "Job Type":
          table_column_name = "job_type"; // array
          whereClause = ` AND $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Field":
          table_column_name = "job_field"; // array
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
        case "Job Industry":
          table_column_name = "job_industry"; // text
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
        case "Job Location":
          table_column_name = "job_location"; // array
          whereClause = ` AND $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Keyword":
          table_column_name = "job_title"; // text
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
      }

      queryParams.push(`${selectsearchparametervalue}`);
    }

    query += `${whereClause} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

    let result;
    try {
      result = await db.query(query, queryParams);
      return {
        error: false,
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        success: false,
        data: [],
      };
    }
  }

  static async GetRemoteResults(
    selectedsearchparameter,
    selectsearchparametervalue,
    limit,
    offset
  ) {
    let query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${process.env.DEFAULT_LOCATION}' ILIKE ANY (job_country) AND 'Remote' ILIKE ANY(job_type)`;
    let queryParams = [limit, offset];
    let whereClause = "";

    if (selectedsearchparameter && selectsearchparametervalue) {
      let table_column_name = "";

      switch (selectedsearchparameter) {
        case "Job Type":
          table_column_name = "job_type"; // array
          whereClause = ` AND $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Field":
          table_column_name = "job_field"; // array
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
        case "Job Industry":
          table_column_name = "job_industry"; // text
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
        case "Job Location":
          table_column_name = "job_location"; // array
          whereClause = ` AND $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Keyword":
          table_column_name = "job_title"; // text
          whereClause = ` AND ${table_column_name} ILIKE $3`;
          break;
      }

      queryParams.push(`${selectsearchparametervalue}`);
    }

    query += `${whereClause} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

    let result;
    try {
      result = await db.query(query, queryParams);
      return {
        error: false,
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        success: false,
        data: [],
      };
    }
  }

  static async GetLocationBasedResults(
    usercountry,
    selectedsearchparameter,
    selectsearchparametervalue,
    limit,
    offset
  ) {
    let result = await this.GetLocationResults(
      usercountry,
      selectedsearchparameter,
      selectsearchparametervalue,
      limit,
      offset
    );

    console.log("Search Type is :" + selectedsearchparameter);
    console.log("Search Type value is :" + selectsearchparametervalue);

    if (result.success) {
      console.log("results found: " + result.data.length);

      if (result.data.length > 0) {
        return {
          result_accuracy: "exact-match",
          result_data: result.data,
        };
      } else {
        console.log(
          "We are now getting remote jobs based on the search parameteres"
        );

        let result = await this.GetRemoteResults(
          selectedsearchparameter,
          selectsearchparametervalue,
          limit,
          offset
        );

        if (result.success) {
          console.log("results found: " + result.data.length);
          if (result.data.length > 0) {
            return {
              result_accuracy: "remote-exact-match",
              result_data: result.data,
            };
          } else {
            console.log("We are now getting All Remote Jobs");

            let result = await this.GetRemoteResults(
              "All Jobs",
              "",
              limit,
              offset
            );

            console.log("WE GOT ALL RANDOM REOMTE JOBS", result.data.length);
            return {
              result_accuracy: "remote-random",
              result_data: result.data,
            };
          }
        }
      }
    }
  }

  static async GetNONLocationBasedResults(
    selectedsearchparameter,
    selectsearchparametervalue,
    limit,
    offset
  ) {
    console.log("DEFAULT LOCATION BASE SEARCH");
    console.log(
      "We are now getting remote jobs based on the search parameteres"
    );

    console.log("Search Type is :" + selectedsearchparameter);
    console.log("Search Type value is :" + selectsearchparametervalue);

    let result = await this.GetRemoteResults(
      selectedsearchparameter,
      selectsearchparametervalue,
      limit,
      offset
    );

    if (result.success) {
      console.log("results found: " + result.data.length);
      if (result.data.length > 0) {
        return {
          result_accuracy: "remote-exact-match",
          result_data: result.data,
        };
      } else {
        console.log("We are now getting All Remote Jobs");

        let result = await this.GetRemoteResults("All Jobs", "", limit, offset);

        console.log("WE GOT ALL RANDOM REOMTE JOBS", result.data.length);
        return {
          result_accuracy: "remote-random",
          result_data: result.data,
        };
      }
    }
  }

  static async insertBlogPost(post) {
    console.log("Hitting");

    const insertQuery = `
      INSERT INTO ${process.env.BLOG_TABLE} 
      (title,excerpt, category, slug, content, status, keywords, tags, readtime)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO NOTHING;
    `;

    try {
      await db.query(insertQuery, [
        post.title,
        post.excerpt || null,
        post.category,
        post.slug,
        post.content,
        post.status || "draft",
        post.keywords || null,
        post.tags || null,
        post.readtime || null,
      ]);
      console.log(`Blog post titled "${post.title}" inserted successfully.`);
      return {
        success: true,
        error: false,
        message: "blog post inserted.",
      };
    } catch (err) {
      return {
        success: false,
        error: true,
        message: err.message,
      };
    }
  }

  static async GetBlogPosts(limit, offset) {
  
    let query = `SELECT * FROM ${process.env.BLOG_TABLE} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    let queryParams=[]
    let result = "";
    console.log(query);
    try {
      result = await db.query(query, queryParams);
      console.log(result.rows);
      return {
        error: false,
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log("error occurs " + error);
      return {
        error: true,
        success: false,
        data: [],
      };
    }
  }


    static async getPostBySlug(post_slug) {
    const query = `SELECT * FROM ${process.env.BLOG_TABLE} WHERE slug = $1;`;
  console.log(query)
    try {
      const result = await db.query(query, [post_slug]);

     
     
      if (result.rows.length === 0) {
        return {
          message: "Post not found",
          success: false,
          error: true,
        };
      }

      return result.rows
    } catch (error) {
      console.error(`Error retrieving job with ID ${post_slug}:`, error.message);
      throw error;
    }
  }

 static async getAllBlogSlugs() {
  
 //let tablename =process.env.BLOG_TABLE
 let tablename ="virtuejob_blog_posts"

 console.log(tablename)

    const query = `SELECT slug FROM ${tablename} ORDER BY post_id DESC;`;


    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving jobs:", error.message);
      throw error;
    }
  }



}
