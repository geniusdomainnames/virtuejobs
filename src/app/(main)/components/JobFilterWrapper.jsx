"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import JobFilter from './JobFilter';

export default function JobFilterWrapper({
  jobsearchparameters,
  selectedJobSearchParameter: initialSelectedJobSearchParameter,
  selectedJobSearchParameterValue: initialSelectedJobSearchParameterValue,
  page
}) {
  const router = useRouter();
  const [selectedJobSearchParameter, setSelectedJobSearchParameter] = useState(initialSelectedJobSearchParameter);
  const [selectedJobSearchParameterValue, setSelectedJobSearchParameterValue] = useState(initialSelectedJobSearchParameterValue);

  function handleFindJob() {
    const params = new URLSearchParams();
    if (selectedJobSearchParameter && selectedJobSearchParameter !== jobsearchparameters[0]) {
      params.set('filter', selectedJobSearchParameter);
      params.set('value', selectedJobSearchParameterValue);
      router.push(`/page/1?${params.toString()}`);
    } else {
      // All Jobs selected: reset filter and value, go to page 1 with no query
      setSelectedJobSearchParameter(jobsearchparameters[0]);
      setSelectedJobSearchParameterValue("");
      router.push(`/page/1`);
    }
  }

  // Intercept clicking 'All Jobs' to immediately reset filter and value and go to page 1
  function handleSelectJobSearchParameter(param) {
    if (param === jobsearchparameters[0]) {
      setSelectedJobSearchParameter(param);
      setSelectedJobSearchParameterValue("");
      router.push(`/page/1`);
    } else {
      setSelectedJobSearchParameter(param);
      setSelectedJobSearchParameterValue("");
    }
  }

  return (
    <JobFilter
      jobsearchparameters={jobsearchparameters}
      selectedJobSearchParameter={selectedJobSearchParameter}
      setSelectedJobSearchParameter={handleSelectJobSearchParameter}
      selectedJobSearchParameterValue={selectedJobSearchParameterValue}
      setSelectedJobSearchParameterValue={setSelectedJobSearchParameterValue}
      onFindJob={handleFindJob}
    />
  );
} 