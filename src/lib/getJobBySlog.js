
import { DatabaseFunctions } from "@/database/databaseFunctions";



export async function getJobBySlog(job_slog) {
    
  console.log("Fetching job with slug:", job_slog);

  const job = await DatabaseFunctions.getJobBySlug(job_slog);
  if (!job) {
    return { success: false, message: "Job not found" }}
  
  const job_comments = await DatabaseFunctions.GetCommentsByJobId(job.job_id)

  let similar_jobs = await DatabaseFunctions.getSimilarJobs(job.job_industry)

  similar_jobs = similar_jobs.filter ((sim_job)=>sim_job.job_id !==job.job_id )

  return { success: true, data: job, comments:job_comments, similar_jobs:similar_jobs };
}