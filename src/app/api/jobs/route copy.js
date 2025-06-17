import { NextResponse } from "next/server";
import db from "../../database/db.js";
import { configDotenv } from "dotenv";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = 25;
//     const offset = (page - 1) * limit;

//     const result = await db.query(
//       `SELECT * FROM ${process.env.DATABASE_TABLE} ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
//       [limit, offset]
//     );

//     return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
//   }
// }




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 25;
    const offset = (page - 1) * limit;

    if (offset < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid page number" },
        { status: 400 }
      );
    }

    // Search parameters
    const selectedsearchparameter = searchParams.get("selectedjobsearchparameter");
    const selectsearchparametervalue = searchParams.get("selectedjobsearchparametervalue");

    let query = `SELECT * FROM ${process.env.DATABASE_TABLE}`;
    let queryParams = [limit, offset];
    let whereClause = "";

    if (selectedsearchparameter && selectsearchparametervalue) {
      let table_column_name = "";

      switch (selectedsearchparameter) {
        case "Job Type":
          table_column_name = "job_type"; // array
          whereClause = ` WHERE $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Field":
          table_column_name = "job_field"; // array
          whereClause = ` WHERE $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Industry":
          table_column_name = "job_industry"; // text
          whereClause = ` WHERE ${table_column_name} ILIKE $3`;
          break;
        case "Job Location":
          table_column_name = "job_location"; // array
          whereClause = ` WHERE $3 ILIKE ANY(${table_column_name})`;
          break;
        case "Job Keyword":
          table_column_name = "job_title"; // text
          whereClause = ` WHERE ${table_column_name} ILIKE $3`;
          break;
        default:
          // If unknown parameter, do nothing or handle differently
          break;
      }

      queryParams.push(`${selectsearchparametervalue}`);
    }

    query += `${whereClause} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

    console.log("SQL Query:", query);
    console.log("Query Parameters:", queryParams);

    const result = await db.query(query, queryParams);

    return NextResponse.json(
      { success: true, data: result.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

