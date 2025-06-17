
"use server"

import { DatabaseFunctions } from "@/database/databaseFunctions";

export async function commentOnBlogPost(state, formData) {
    console.log(formData.get("email"), formData.get("name"));
  
    let post_id = formData.get("post_id")
    let commetor_name = formData.get("name");
    let commetor_email = formData.get("email");
    let commetor_comment = formData.get("comment");
  
    const errors = {};
  
   
  if (!post_id){
    console.log("No post id")
    return
  }
  
  
    if (
      !commetor_name ||
      typeof commetor_name !== "string" ||
      commetor_name.trim().length < 2
    ) {
      errors.name = "Invalid name.";
    }
  
    if (
      !commetor_email ||
      typeof commetor_email !== "string" ||
      !commetor_email.includes("@")
    ) {
      errors.email = "Invalid email";
    }
  
    if (!commetor_comment) {
      errors.comment = "Please add your comment.";
    }
  
    if (Object.keys(errors).length > 0) {
      console.log("Validation failed:", errors);
      return {
        
        errors,
        name: commetor_name,
        email: commetor_email,
        comment: commetor_comment,
      };
    }
  
     let result = await DatabaseFunctions.InsertBlogComment(post_id,commetor_name,commetor_email, commetor_comment)
    if (result.success){
      return{
          sucess:true,
          error:false
      }
       
    }
    else{
       return{
          sucess:false,
          error:true
      }
       
    }
  
  
  
  
  
  }