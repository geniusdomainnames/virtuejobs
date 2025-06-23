
import { DatabaseFunctions } from "@/database/databaseFunctions";
import * as matter from 'gray-matter';
import { generateMetadata } from "./generateBlogPostMetaData";
import { CreateBlogCommentsTable } from "@/database/tableCreator";


export async function getBlogPostBySlog(blog_post_slog) {
    
  console.log("Fetching job with slug:", blog_post_slog);

  const blog_post_response = await DatabaseFunctions.getPostBySlug(blog_post_slog);
  if (!blog_post_response || !Array.isArray(blog_post_response)) {
    return { success: false, message:blog_post_response?.message }}
  


    let blogPost= blog_post_response[0]
    


// console.log(`BLOG POST TITLE: ${blogPost?.title}`)
     const {content, data}= matter(blogPost.content)
    blogPost['matter_content']= content
    blogPost['matter_data']= data

    
  //const blog_comments = await DatabaseFunctions.GetBlogCommentsByPostId(blogPost.post_id)
  const blog_comments=[]

  blogPost['blog_comments']=blog_comments
  let returnData = [];
  returnData.push(blogPost)

  //let similar_jobs = await DatabaseFunctions.getSimilarJobs(job.job_industry)
 // similar_jobs = similar_jobs.filter ((sim_job)=>sim_job.job_id !==job.job_id )

  //return { success: true, data: post, comments:job_comments, similar_jobs:similar_jobs };
 return { success: true, data: returnData}; 
}