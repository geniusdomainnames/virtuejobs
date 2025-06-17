"use client"
import React, { useEffect, useState, createContext, useContext } from 'react'

import PersonalInformation from "../components/PersonalInformation";
import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Review from "../components/Review";
import Reference from "../components/Reference";
import toast from 'react-hot-toast';
import axios from 'axios';
import DownloadResume from '../components/Download';

// Context for Resume Builder
export const ResumeBuilderContext = createContext();
export function useResumeBuilder() {
  return useContext(ResumeBuilderContext);
}

export default function ResumeBuilder() {
  // Helper for localStorage
  const storageKey = 'resumeBuilderData';
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return null;
        }
      }
    }
    return null;
  };

  const initial = getInitialState() || {
    contactData: {
      firstName: '',
      middleName: '',
      lastName: '',
      jobTitle: '',
      phone: '',
      country: '',
      city: '',
      address: '',
      email: '',
      linkedin: '',
      website: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    references: []
  };

  const [contactData, setContactData] = useState(initial.contactData);
  const [workExperience, setWorkExperience] = useState(initial.workExperience);
  const [education, setEducation] = useState(initial.education);
  const [skills, setSkills] = useState(initial.skills);
  const [projects, setProjects] = useState(initial.projects);
  const [references, setReferences] = useState(initial.references);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [loadingDownload, setLoadingDownload] = useState(false)
  const sections = [
    "Contact",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "References",
    "Review",
    "Download"
  ];
  const [currentStep, setCurrentStep] = useState(0);

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          contactData,
          workExperience,
          education,
          skills,
          projects,
          references
        })
      );
    }
  }, [contactData, workExperience, education, skills, projects, references]);

  // Clear all data (for after submit)
  const clearAllData = () => {
    setContactData({
      firstName: '',
      middleName: '',
      lastName: '',
      jobTitle: '',
      phone: '',
      country: '',
      city: '',
      address: '',
      email: '',
      linkedin: '',
      website: ''
    });
    setWorkExperience([]);
    setEducation([]);
    setSkills([]);
    setProjects([]);
    setReferences([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  function addworkExperience(workExperiencedata) {
    setWorkExperience((prev) => [...prev, workExperiencedata]);
    console.log(workExperience)

  }
  function removeWorkExperience(index) {
    setWorkExperience((prev) => prev.filter((_, i) => i !== index));
  }

  const handleNextStep = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSectionChange = (section) => {
    const sectionIndex = sections.indexOf(section);
    if (sectionIndex !== -1) {
      setCurrentStep(sectionIndex);
    }
  };

  // Content for each step
  const renderSectionContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <p>Please fill in your personal information.</p>
            <PersonalInformation contactData={contactData} setContactData={setContactData} />
            <p className="text-sm text-gray-500 mt-2">
              Note: The job title is optional.
            </p>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Please fill in your work experience details.</p>
            <WorkExperience workExperience={workExperience} setWorkExperience={setWorkExperience} removeWorkExperience={removeWorkExperience} addworkExperience={addworkExperience} />
          </div>
        )
      case 2:

        return (
          <div>
            <p>Please provide your educational background and certifications.</p>

            <Education education={education} setEducation={setEducation} />
          </div>
        )
      case 3:
        return (
          <div>
            <p>Please list your skills.</p>

            <Skills skills={skills} setSkills={setSkills} />
          </div>
        )
      case 4:

        return (
          <div>
            <p>Please describe your projects.</p>
            <Projects projects={projects} setProjects={setProjects} />
          </div>
        )
      case 5:


        return (
          <div>
            <p>Add Refrences.</p>
            <Reference references={references} setReferences={setReferences} />
          </div>
        )

      case 6:


        return (
          <div>
            <p>Review all the information you have entered.</p>
            <Review contactData={contactData} workExperience={workExperience} education={education} skills={skills} projects={projects} references={references} />
          </div>
        )
      case 7:
 

        return (
          <div>

            <DownloadResume 
            selectedFormat={selectedFormat} 
            setSelectedFormat={setSelectedFormat}
            loadingDownload={loadingDownload}
            handleSubmit = {handleSubmit}
            
            />
          </div>
        )
    }
  };

  function validateContactInformation(contactData) {
    const errors = {};

    // Validate First Name
    if (!contactData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    } else if (contactData.firstName.length > 50) {
      errors.firstName = 'First name cannot exceed 50 characters';
    }

    // Validate Last Name
    if (!contactData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    } else if (contactData.lastName.length > 50) {
      errors.lastName = 'Last name cannot exceed 50 characters';
    }

    // Validate Phone
    if (!contactData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      // Basic phone validation - adjust regex according to your requirements
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/;
      if (!phoneRegex.test(contactData.phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Validate Email
    if (!contactData.email?.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Validate Address
    if (!contactData.address?.trim()) {
      errors.address = 'Address is required';
    } else if (contactData.address.length > 200) {
      errors.address = 'Address cannot exceed 200 characters';
    }

    // // Validate Country
    // if (!contactData.country?.trim()) {
    //   errors.country = 'Country is required';
    // }

    // // Validate City
    // if (!contactData.city?.trim()) {
    //   errors.city = 'City is required';
    // } else if (contactData.city.length > 50) {
    //   errors.city = 'City cannot exceed 50 characters';
    // }

    // // Validate Gender
    // if (!contactData.gender) {
    //   errors.gender = 'Gender is required';
    // } else if (!['Male', 'Female', 'Other'].includes(contactData.gender)) {
    //   errors.gender = 'Please select a valid gender';
    // }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }


async function handleSubmit() {
 // Validate contact data before submitting
 const contactValidation = validateContactInformation(contactData);
  if (!contactValidation.isValid) {
    toast.error("Please fix errors in contact information before submitting.");
    return;
  }

  if (!selectedFormat) {
    toast.error("Please select a download format.");
    return;
  }

  const requestBody = {
    contactData,
    workExperience,
    education,
    skills,
    projects,
    references,
    selectedFormat,
  };

  // Map format to MIME type and file extension
  const formatMap = {
    docx: {
      mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      extension: "docx",
    },
    pdf: {
      mime: "application/pdf",
      extension: "pdf",
    },
    // add other formats here if supported
  };


  const formatInfo = formatMap[selectedFormat.toLowerCase()];
  if (!formatInfo) {
    toast.error("Unsupported format selected.");
    return;
  }

  try {
    setLoadingDownload(true);

    const response = await axios.post("/api/resume-builder", requestBody, {
      responseType: "blob", // important for binary data
    });

    console.log(response.data)

    const blob = new Blob([response.data], { type: formatInfo.mime });

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `resume.${formatInfo.extension}`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(link.href);
    clearAllData();
  } catch (error) {
    console.error("Download failed", error);
    toast.error("Something went wrong while generating the resume.");
  } finally {
    setLoadingDownload(false);
  }
}

  return (
    <ResumeBuilderContext.Provider value={{
      contactData, setContactData,
      workExperience, setWorkExperience,
      education, setEducation,
      skills, setSkills,
      projects, setProjects,
      references, setReferences,
      clearAllData
    }}>
      <div className="min-h-screen">
        <div className="flex flex-col  lg:w-[75%] mx-auto">
          {/* <h1 className="text-4xl font-bold mb-6 text-center">
            Welcome to My CV Builder
          </h1> */}

          <div className="lg:flex lg:flex-row lg:p-6">
            {/* CVBuilderMenu Component Inline */}
            <div className="cv-builder-menu">

              <div className="space-y-2 lg:flex lg:flex-col flex flex-row flex-wrap gap-3 p-3">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={` flex items-center cursor-pointer transition-colors duration-1000 gap-3  ${index === currentStep ? "bg-green-800 text-white" : "bg-white"
                      } lg:p-4 p-2 rounded-full shadow-md`}
                    onClick={() => handleSectionChange(section)}
                  >
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center ">
                      {index + 1}
                    </div>
                    <span className="text-lg font-medium">{section}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[95%] mx-auto flex-1 bg-green-50 p-2 lg:p-6 rounded-lg shadow-md mt-6 lg:mt-0 lg:ml-6">
              {/* CVBuilderContent Component Inline */}
              <h2 className="text-2xl font-semibold mb-4">
                {sections[currentStep]}
              </h2>
              {renderSectionContent()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between p-6">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="lg:px-7 lg:py-7 px-3 py-3 bg-green-800 text-green-100 disabled:opacity-50 rounded-full shadow lg:w-[200px] w-[100px] flex gap-2 items-center justify-center"
            >
              Previous
            </button>

            {
              currentStep !== 7 &&

              <div>



                <button
                  onClick={
                    currentStep === sections.length - 1 ? handleSubmit : handleNextStep
                  }

                  className="lg:px-7 lg:py-7 px-3 py-3 bg-green-800 text-green-100 disabled:opacity-50 rounded-full shadow lg:w-[200px] w-[100px] flex gap-2 items-center justify-center"
                >
                  {currentStep === sections.length - 1 ? "Submit" : "Next"}
                </button>








              </div>












            }
          </div>
        </div>
      </div>
    </ResumeBuilderContext.Provider>
  )
}
