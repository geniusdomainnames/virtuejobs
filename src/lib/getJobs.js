import db from "../database/db";
import { CreateTables } from "@/database/tableCreator";

import { DatabaseFunctions } from "../database/databaseFunctions";

export async function getJobs(
  requestedpage,
  selectedsearchparameter,
  selectsearchparametervalue,
  usercountry
) {

  //await CreateTables()

  let limit = 15;
  let page = requestedpage || 1;
  const offset = (page - 1) * limit;
  let location_based_results = false;

  if (offset < 0) {
    return null;
  }
  let result;

  try {
    if (usercountry) {
      location_based_results = true;
      result = await DatabaseFunctions.GetLocationBasedResults(
        usercountry,
        selectedsearchparameter,
        selectsearchparametervalue,
        limit,
        offset
      );
    } else {
      location_based_results = false;
      result = await DatabaseFunctions.GetNONLocationBasedResults(
        selectedsearchparameter,
        selectsearchparametervalue,
        limit,
        offset
      );
    }

    console.log("Location Based Result: " + location_based_results);
    console.log("RESULT ACCURACY: " + result.result_accuracy);
    if (result.result_accuracy != "exact-match") {
      location_based_results = false;
    }

    return {
      success: true,
      data: result.result_data,
      location_based_result: location_based_results,
      result_accuracy: result.result_accuracy,
    };
  } catch (error) {
    console.log("Error fetching jobs:", error);
    return {
      success: false,
      data: [],
      location_based_result: false,
      result_accuracy: "NILL",
    };
  }
}
