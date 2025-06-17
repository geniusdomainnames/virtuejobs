import { NextResponse } from "next/server";
import { DatabaseFunctions } from "../../../../../database/databaseFunctions";

// app/api/some-endpoint/route.js or route.ts

export async function POST(request) {
  const body = await request.json(); // ✅ Use this to get the body


  console.log(body);

 let result = await DatabaseFunctions.InsertComment(body.job_id,body.name,body.email, body.comment)
  if (result.success){
    return NextResponse.json({error:false, sucess:true, message:result.message},{status:200})
     
  }
  else{
    return NextResponse.json({error:true, sucess:false, message:result.message},{status:200})
  }

  

 
}
