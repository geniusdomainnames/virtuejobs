


import JobCommentComponent from '../../components/JobCommentComponent';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
// import { jobCommentAction } from '@/lib/jobCommentAction';

import { HiCheck, HiLocationMarker } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";

import JobListItem from '../../components/JobListItem';

import JobPageSkeleton from '../../components/JobPageSkeleton';
import { getJobBySlog } from '@/lib/getJobBySlog';
import JobCommentForm from '../../components/JobCommentForm';
import ShowApplicatoinLinkButton from '../../components/ApplicationLinkComponent';
import ApplicationLinkComponent from '../../components/ApplicationLinkComponent';

export default async function JobDetailsPage({ params }) {
  const urlParams = await params
  // console.log("PARAMS = " + urlParams.job_slog)

  let jobDataResponse = await getJobBySlog(urlParams.job_slog)
  let job;
  let job_comments;
  let similar_jobs;
  let showApplicationLink = false


  //console.log(jobDataResponse)

  if (jobDataResponse.success) {
    
    job = jobDataResponse.data
    similar_jobs = jobDataResponse.similar_jobs
    job_comments = jobDataResponse.comments
  }

  else {
    job = null
    job_comments = []
    similar_jobs = []
  }

  function setShowAppllicationLink() {
    showApplicationLink = true
  }



  return (
    <section>
      <div className="lg:w-[75%] mx-auto p-6 bg-white rounded-lg  w-full">
        {/* Job Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-1 text-sm text-green-700 bg-green-100 py-2 rounded-full px-2">
              <FaRegClock className="w-4 h-4" />
              <span>{job.job_post_date}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {job.job_title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{job.job_company_name}</p>

          {/* Job Meta */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {job.job_industry}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {job.job_type.join(" and ")}
            </span>
            <span className="px-3 py-1 flex items-center gap-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              <FaMoneyBillAlt className="w-4 h-4" />

              <span>{job.job_salary || "N/A"}</span>
            </span>
            <div className="px-3 py-1 flex items-center gap-1 text-gray-600 border rounded-full text-sm">
              <HiLocationMarker className="w-4 h-4" />
              <span>{job.job_location.join(" | ")}</span>
            </div>
          </div>
        </div>


        <div className='flex items-center  justify-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-3'>
          <div className="flex items-center gap-2">
            <IoIosTimer className="text-red-600" size={20} />
            <span className="font-medium">Application Deadline:</span>
          </div>
          <span>{job.application_deadline}</span>
        </div>


        <div className='flex flex-col gap-2 shadow-sm rounded-2xl p-3 lg:p-6'>



          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Company</h2>
            <p className="space-y-3">
              {job.job_company_description}
            </p>
          </section>








          {/* Job Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {
                job.job_description
              }
            </p>
          </section>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Key Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((job_responsibility, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  {/* <HiCheck  /> */}
                  <BsArrowReturnRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    {job_responsibility}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Professional Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility</h2>
            <ul className="space-y-3">
              {job.eligibility.map((job_eligibility, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">



                  <IoMdArrowDroprightCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    {job_eligibility}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Apply</h2>
            <ul className="space-y-3">
              {job.how_to_apply.map((how_to_apply, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>
                    {how_to_apply}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <hr className="my-8 border-gray-200" />
          <section className="mb-8">
            <ApplicationLinkComponent applicationLink={job.apply_link} />
          </section>

        </div>


        <section className="mb-8 mt-4 w-full">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments ({job_comments.length})</h2>
          <div>


            <div className='flex gap-2.5 flex-col'>
              {
                job_comments.map((comment, index) => (
                  <div className='ml-2' key={index}>
                    <div className='text-green-700 flex gap-1.5 items-center'>
                      <FaUser />
                      {comment.name}</div>
                    <p className='ml-4'>{comment.comment}</p>
                  </div>
                ))
              }
            </div>
          </div> 

          {/* <JobCommentComponent handler={jobCommentAction} /> */}

          <JobCommentForm job_id={job.job_id} />
        </section>



        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Related Jobs
          </h1>

          <div className='flex flex-col gap-3'>
            {
              similar_jobs.map((job, index) =>
                <div key={index}>
                  <JobListItem job={job} />
                </div>
              )
            }
          </div>


        </div>
      </div>
    </section>
  );
}
