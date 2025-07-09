
import { DatabaseFunctions } from "../../src/database/databaseFunctions";

export async function getAllBlogPostSlugs() {

    let result = await DatabaseFunctions.getAllBlogSlugs();
    console.log(result)
    return result;
   
    
}