import { getUserLocation } from "@/lib/getUserLocation";
import { getJobs } from "@/lib/getJobs";
import JobListItemSkeleton from "../../(main)/components/JobListItemSkeleton";
import JobListItem from "../../(main)/components/JobListItem";
import Image from "next/image";
import PageNav from "../../(main)/components/PageNav";
import Link from "next/link";
import JobFilterWrapper from "../../(main)/components/JobFilterWrapper";
import { Suspense } from "react";
import { headers } from "next/headers";
import { CreateTables } from "@/database/tableCreator";

const jobsearchparameters = [
  "All Jobs",
  "Job Field",
  "Job Type",
  "Job Industry",
  "Job Location",
  "Job Keyword",
];

function getFilterFromSearchParams(searchParams) {
  let selectedJobSearchParameter = searchParams?.filter || jobsearchparameters[0];
  let selectedJobSearchParameterValue = searchParams?.value || "";
  return { selectedJobSearchParameter, selectedJobSearchParameterValue };
}

export default async function Home({ params, searchParams }) {

  //await CreateTables();

  const page = parseInt(await(params.page)) || 1;
  let { selectedJobSearchParameter, selectedJobSearchParameterValue } = getFilterFromSearchParams(searchParams);

  // Get location and jobs on the server
  const headersList = await headers();
  const locationData = await getUserLocation(headersList);
  const jobDataResponse = await getJobs(
    page,
    selectedJobSearchParameter,
    selectedJobSearchParameterValue,
    locationData?.data?.country
  );
  const jobList = jobDataResponse.success ? jobDataResponse.data : [];
  const resultAccuracy = jobDataResponse.result_accuracy;
  const locationBasedResult = jobDataResponse.location_based_result;

  return (
    <section className="p-4 ">
      <div className="flex flex-col gap-3 pb-20">
        <Suspense fallback={<div className="mb-4"><JobListItemSkeleton /></div>}>
          <JobFilterWrapper
            jobsearchparameters={jobsearchparameters}
            selectedJobSearchParameter={selectedJobSearchParameter}
            selectedJobSearchParameterValue={selectedJobSearchParameterValue}
            page={page}
          />
        </Suspense>
     
        <div className="mx-auto">
          {locationData?.data?.flag && (
            <div className="flex gap-2 py-2 px-3 border border-gray-300 rounded-full mt-3 ">
              <Image
                src={locationData?.data?.flag?.img}
                alt="flag"
                width={30}
                height={20}
                priority
                className="rounded-full"
                style={{ height: "auto" }}
              />
              <p>{locationData?.data?.country}</p>
            </div>
          )}
        </div>
        {jobList.length === 0 ? (
          <div className=" flex flex-col w-full px-3 lg:mx-auto lg:w-[70%] lg:gap-6 gap-3">
            <div className="bg-red-300 p-5 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center">
                <Image
                  src="/images/message.png"
                  alt="site-logo"
                  width={50}
                  height={50}
                  priority
                  className="w-[50px] h-[50-px]"
                />
                <p>End of List reached</p>
              </div>
              <p className="rounded-2xl p-3 bg-green-900 text-green-50">
                You can go back <Link className="bg-green-500 p-2 rounded shadow-md " href={`/page/${1}`}>here </Link>
              </p>
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <JobListItemSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div>
            {locationBasedResult ? (
              <div>
                {(resultAccuracy == "exact-match" || resultAccuracy == "remote-exact-match") && (
                  <div className="flex flex-col lg:w-[70%] lg:gap-6 gap-3 min-h-screen mt-4 lg:mt-6 borer border-black mx-auto">
                    {jobList.map((job) => (
                      <div key={job.job_id}>
                        <JobListItem job={job} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {resultAccuracy == "remote-exact-match" && (
                  <div className="flex flex-col lg:w-[70%] lg:gap-6 gap-3 min-h-screen mt-4 lg:mt-6 mx-auto">
                    <div className="bg-red-200 border border-red-100 shadow rounded-3xl flex items-center justify-center  lg:mx-auto p-6 w-[90%] mx-auto ">
                      <p>
                        "no jobs found in your current location" check out
                        related "remote jobs"
                      </p>
                    </div>
                    <div className="bg-green-50 py-3 lg:py-3 lg:px-3 rounded-2xl flex flex-col gap-3">
                      {jobList.map((job) => (
                        <div key={job.job_id}>
                          <JobListItem job={job} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {resultAccuracy == "remote-random" && (
                  <div className="flex flex-col lg:w-[70%] lg:gap-6 gap-3 min-h-screen mt-4 lg:mt-6  mx-auto">
                    <div className="bg-red-200 border border-red-100 shadow rounded-3xl flex items-center justify-center  lg:mx-auto p-6 w-[90%] mx-auto ">
                      <p>
                        "no jobs found in your current location" check out
                        "other jobs"
                      </p>
                    </div>
                    <div className="bg-red-50 py-3 lg:py-3 lg:px-3 rounded-2xl flex flex-col gap-3">
                      {jobList.map((job) => (
                        <div key={job.job_id}>
                          <JobListItem job={job} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {jobList.length === 25 && (
          <PageNav 
            page={page} 
            filter={selectedJobSearchParameter !== jobsearchparameters[0] ? selectedJobSearchParameter : undefined}
            value={selectedJobSearchParameter !== jobsearchparameters[0] ? selectedJobSearchParameterValue : undefined}
          />
        )}
      </div>
    </section>
  );
}
