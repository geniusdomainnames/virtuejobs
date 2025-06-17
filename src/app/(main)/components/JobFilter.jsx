"use client";
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { GlobalVariables } from '../../../utils/GlobalVariables';

export default function JobFilter({
  jobsearchparameters,
  selectedJobSearchParameter,
  setSelectedJobSearchParameter,
  selectedJobSearchParameterValue,
  setSelectedJobSearchParameterValue,
  onFindJob
}) {
  return (
    <div className="section-container">
      <div className="section-container-inner">
        <div className="">
          <div className="flex flex-col justify-center items-center gap-4 lg:gap-6 ">
            {/* <h1 className="text-center text-xl md:text-2xl font-bold text-gray-900 lg:w-[60%]">
              Find a job that suits your interest & skills.
            </h1> */}

            <div className="flex flex-wrap gap-2">
              {jobsearchparameters.map((param, index) => (
                <div
                  key={index}
                  className={`lg:py-3 py-2  flex justify-center text-xs lg:text-xl px-1  w-[78px] lg:w-[150px] rounded-2xl lg:rounded-2xl shadow-2xl cursor-pointer  ${
                    selectedJobSearchParameter === param
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedJobSearchParameterValue("");
                    setSelectedJobSearchParameter(param);
                  }}
                >
                  <p className="text-center">{param}</p>
                </div>
              ))}
            </div>

           {
            selectedJobSearchParameter !=="All Jobs" &&
             <div className="flex flex-col lg:gap-6 gap-4 w-full bg-amber-50 rounded-lg shadow-lg p-6 lg:mb-16 mb-6">
             
             
              {selectedJobSearchParameter === "Job Field" && (
                <div className="flex flex-1 items-center rounded-md lg:border-r border px-2 lg:px-4 lg:py-2">
                  <FaSearch className="text-gray-600 mr-2" />
                  <select
                    value={selectedJobSearchParameterValue}
                    className="w-full text-sm p-2 outline-none"
                    onChange={(e) => setSelectedJobSearchParameterValue(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Job Field
                    </option>
                    {GlobalVariables.jobFields.map((option, i) => (
                      <option key={i} value={option}>
                        {option.replace(/\s*\/\s*/g, " || ")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedJobSearchParameter === "Job Industry" && (
                <div className="flex flex-1 items-center rounded-md lg:border-r border px-2 lg:px-4 lg:py-2">
                  <FaSearch className="text-gray-600 mr-2" />
                  <select
                    value={selectedJobSearchParameterValue}
                    className="w-full text-sm p-2 outline-none"
                    onChange={(e) => setSelectedJobSearchParameterValue(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Job Industry
                    </option>
                    {GlobalVariables.jobRoles.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedJobSearchParameter === "Job Type" && (
                <div className="flex flex-1 items-center rounded-md lg:border-r border px-2 lg:px-4 lg:py-2">
                  <FaSearch className="text-gray-600 mr-2" />
                  <select
                    value={selectedJobSearchParameterValue}
                    className="w-full text-sm p-2 outline-none"
                    onChange={(e) => setSelectedJobSearchParameterValue(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Job Type
                    </option>
                    {GlobalVariables.jobTypes.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedJobSearchParameter === "Job Location" && (
                <div className="flex flex-1 items-center rounded-md lg:border-r border px-2 lg:px-4 lg:py-2">
                  <FaSearch className="text-gray-600 mr-2" />
                  <select
                    value={selectedJobSearchParameterValue}
                    className="w-full text-sm p-2 outline-none"
                    onChange={(e) => setSelectedJobSearchParameterValue(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a Job Location
                    </option>
                    {GlobalVariables.states.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedJobSearchParameter === "Job Keyword" && (
                <div className="flex flex-1 items-center rounded-md border px-2 lg:px-4 lg:py-2">
                  <FaSearch className="text-gray-600 mr-2" />
                  <input
                    type="text"
                    placeholder="Job title, keyword..."
                    className="outline-none w-full text-black p-2"
                    value={selectedJobSearchParameterValue}
                    onChange={(e) => setSelectedJobSearchParameterValue(e.target.value)}
                  />
                </div>
              )}

              {selectedJobSearchParameter !== "All Jobs" && (
                <button
                  type="button"
                  className="bg-green-600 text-white px-6 lg:py-4 py-3  hover:bg-gren-700 flex-1 lg:w-[300px] lg:mx-auto rounded-2xl "
                  disabled={!selectedJobSearchParameterValue}
                  onClick={onFindJob}
                >
                  Find Job
                </button>
              )}

               {selectedJobSearchParameter === "Job Keyword" && (
              <p className="text-gray-600 text-center text-xs">
                Suggestion:{" "}
                <span className="text-green-700">
                  Designer, Programming, Digital Marketing, Video, Animation
                </span>
              </p>
            )}
            </div>
           }

           
          </div>
        </div>
      </div>
    </div>
  );
}
