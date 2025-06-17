import { DatabaseFunctions } from "@/app/database/databaseFunctions";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("Hitting job slug endpoint");
 // console.log("Params:", params);

  const job_slog = await params.job_slog;

  console.log("Fetching job with slug:", job_slog);

  const job = await DatabaseFunctions.getJobBySlug(job_slog);
  if (!job) {
    return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
  }
  
  const job_comments = await DatabaseFunctions.GetCommentsByJobId(job.job_id)

  let similar_jobs = await DatabaseFunctions.getSimilarJobs(job.job_industry)

  similar_jobs = similar_jobs.filter ((sim_job)=>sim_job.job_id !==job.job_id )

  return NextResponse.json({ success: true, data: job, comments:job_comments, similar_jobs:similar_jobs });
}
