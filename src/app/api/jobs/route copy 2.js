import { NextResponse } from "next/server";
import db from "../../database/db.js";
import { configDotenv } from "dotenv";
import { DatabaseFunctions } from "@/app/database/databaseFunctions.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 25;
    const offset = (page - 1) * limit;
    let location_based_results = false;

    if (offset < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid page number" },
        { status: 400 }
      );
    }

    // Search parameters
    const selectedsearchparameter = searchParams.get("selectedjobsearchparameter");
    const selectsearchparametervalue = searchParams.get("selectedjobsearchparametervalue");
    const usercountry = searchParams.get("country");



    if (usercountry){
      DatabaseFunctions.GetLocationBasedResults(usercountry, selectedsearchparameter, selectsearchparametervalue, limit, offset)
    }
    else{
      DatabaseFunctions.GetNONLocationBasedResults(selectedsearchparameter, selectsearchparametervalue, limit, offset)
    }




    let query = "";

    if (usercountry) {
      // location based search
      console.log("USER COUNTRY IS:"+usercountry)
      location_based_results = true;
      query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${usercountry}' ILIKE ANY (job_country)`;
    } else {
      console.log("NO USER COUNTRY:")
      
      location_based_results = false;
      query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${process.env.DEFAULT_LOCATION}' ILIKE ANY (job_country)  AND 'Remote' ILIKE ANY(job_type)`;
    }

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
        default:
          // If unknown parameter, do nothing or handle differently
          break;
      }

      queryParams.push(`${selectsearchparametervalue}`);
    }

    query += `${whereClause} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;

    console.log("SQL Query:", query);
    console.log("Query Parameters:", queryParams);

    let result;
   
    result = await db.query(query, queryParams);


    

    if (result.rows.length === 0) {

      if (location_based_results){
        console.log(" RESULT IS LOCATION BASED")
         query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${process.env.DEFAULT_LOCATION}' ILIKE ANY (job_country)`;

      }
      else{
         console.log(" RESULT IS NOT LOCATION BASED")
            query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE '${process.env.DEFAULT_LOCATION}' ILIKE ANY (job_country)  AND 'Remote' ILIKE ANY(job_type)`;
             if (selectedsearchparameter && selectsearchparametervalue) {
             }
            
            
            
            console.log("SQL Query:", query);
    console.log("Query Parameters:", queryParams);
             result = await db.query(query,[]);

      }
      
     
    }

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
        location_based_result: location_based_results,
       
      },
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
