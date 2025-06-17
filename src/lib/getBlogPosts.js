

import { DatabaseFunctions } from "../database/databaseFunctions";

export async function getBlogs(requestedpage){
   let limit=10;
    let page = requestedpage ||1;
    const offset = (page-1) * limit;

    if (offset<0){
        return null
    }

    let result;

    try {
        result = await DatabaseFunctions.GetBlogPosts(
            limit,
            offset
        )




        

        return {
      success: true,
      data: result.data,
      error:false,
    };
        
    } catch (error) {
           return {
      success: true,
      data:[],
      error:false,
    };
    }




}