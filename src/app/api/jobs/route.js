import { NextResponse } from "next/server";
import db from "../../database/db.js";
import { configDotenv } from "dotenv";
import { DatabaseFunctions } from "@/app/database/databaseFunctions.js";

export async function GET(request) {
  console.log("Hitting the Api endpoint")
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
    const selectedsearchparameter = searchParams.get(
      "selectedjobsearchparameter"
    );
    const selectsearchparametervalue = searchParams.get(
      "selectedjobsearchparametervalue"
    );
    const usercountry = searchParams.get("country");

    let result;

    if (usercountry) {
      location_based_results=true
      result = await DatabaseFunctions.GetLocationBasedResults(
        usercountry,
        selectedsearchparameter,
        selectsearchparametervalue,
        limit,
        offset
      );
    } else {
      location_based_results=false
      result = await DatabaseFunctions.GetNONLocationBasedResults(
        selectedsearchparameter,
        selectsearchparametervalue,
        limit,
        offset
      );
    }

    console.log("Location Based Result: "+ location_based_results)
    console.log("RESULT ACCURACY: "+ result.result_accuracy)
    if (result.result_accuracy != "exact-match") {
      location_based_results = false;
    }

    console.log(result.result_accuracy);

    return NextResponse.json(
      {
        success: true,
        data: result.result_data,
        location_based_result: location_based_results,
        result_accuracy: result.result_accuracy,
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
