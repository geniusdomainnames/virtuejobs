import { HiLocationMarker, HiChevronRight } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import Link from 'next/link';
import { GlobalFunctions } from '../../../utils/GlobalFunctions';
export default function JobListItem({job}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 lg:w-full w-[95%] mx-auto ">
      {/* Time and Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-1 text-sm text-green-700 bg-green-100 py-2 rounded-full px-2">
          <FaRegClock className="w-4 h-4" />
          <span>{job.job_post_date}</span>
        </div>
      </div>

    <div className="flex flex-col gap-4 ">

        {/* Job Title and Company */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
         {job.job_title}
        </h3>
        <p className="text-gray-600">
         {job.job_company_name}
        </p>
      </div>

      <div>
    {/* Job Short Description */}
        <p className="text-gray-800">
          {job.job_short_description}
        </p>
      </div>

     
      {/* Job Meta */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-4 mb-3">
        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm w-full md:w-auto text-center md:text-left">
        {job.job_industry}
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm w-full md:w-auto text-center md:text-left">
          {Array.isArray(job?.job_type) ? job.job_type.join(" and ") : (job?.job_type ?? "")}
        </div>
        <div className="px-3 py-1 flex items-center gap-1 text-gray-600 border border-gray-300 text-sm rounded-full w-full md:w-auto justify-center md:justify-start">
          <HiLocationMarker className="w-4 h-4" />
          <p>{Array.isArray(job?.job_location) ? job.job_location[0] : (job?.job_location ?? "")}</p>
        </div>
      </div>



    </div>
      {/* Job Details Link */}
      
      <div className="flex justify-end">
         <Link href={`/jobs/${GlobalFunctions.slugify(job.job_topic)}`} className="text-green-100 bg-green-600 hover:text-green-300 font-medium flex items-center gap-2 py-3 px-5 rounded-full">See more</Link>
      </div>
    </div>
  );
}