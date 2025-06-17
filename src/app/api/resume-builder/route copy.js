import { NextResponse } from 'next/server';
import { ResumeAIAgent } from './ResumeAgent';
import { generateResumeDocx, createPDFBufferFromResumeData } from './templateGenerator';
import { GlobalFunctions } from '@/utils/GlobalFunctions';

export async function POST(request) {
  const { selectedFormat } = await request.json();

  const contactData = {
    firstName: 'Chimaobi',
    middleName: 'Longinus',
    lastName: 'Olegeme',
    jobTitle: 'Software Developer',
    phone: '08157967548',
    country: 'Nigeria',
    city: 'Lagos',
    address: 'No 38 Aminat Street by Vokanizer Lasu Road Lagos Nigeria',
    email: 'me.chimaobi@gmail.com',
    gender: 'Male',
    dob: '1996-08-12',
    linkedin: '',
    website: ''
  };

  const workExperience = [
    {
      jobTitle: 'Front End Web Development Intern',
      company: 'Etarious Technologies Computer Center.',
      country: 'United States',
      state: 'Nevada',
      city: 'Lasvegas',
      startMonth: '2',
      startYear: '2021',
      endMonth: '11',
      endYear: '2021',
      currentlyWorking: false
    },
    {
      jobTitle: 'Software Developer Internship',
      company: 'Unified Payments',
      country: 'United States',
      state: 'Nevada',
      city: 'Reno',
      startMonth: '3',
      startYear: '2022',
      endMonth: '',
      endYear: '',
      currentlyWorking: true
    }
  ];

  const education = [
    {
      schoolName: 'Madonna University',
      schoolLocation: 'Porthacourt',
      degree: 'Bsc',
      fieldOfStudy: 'Computer Science',
      entryYear: '2012',
      graduationYear: '2016',
      hideGraduationDate: false
    },
    {
      schoolName: 'Rapid Comprehensive College',
      schoolLocation: 'Imo State Nigeria',
      degree: 'WAEC',
      fieldOfStudy: 'Secondary School Leaving (SSCE)',
      entryYear: '2008',
      graduationYear: '2011',
      hideGraduationDate: false
    }
  ];

  const skills = ['Node Js', 'React', 'C#', 'Apache Nifi'];

  const projects = [
    {
      project_name: 'Letsoutbound',
      project_start_date: '2024-07-04',
      project_end_date: '2024-08-15',
      activities: [
        'Independently conceived, designed, and implemented a full-stack email scheduling website using React.js for the front end, Node.js and Express for the back end, and Mongo DB for data storage.',
        'Implemented user authentication and a responsive user interface for seamless interaction.',
        'Developed a scheduling feature allowing users to set up and manage email dispatches at specific dates and times.',
        'Developed an allocation feature allowing users to allocate sections of email list to multiple email accounts.',
        'Conducted thorough testing and debugging to ensure the reliability and functionality of the website.'
      ],
      project_summary: 'An emailing platform where users can send bulk emails from multiple Gmail accounts.'
    }
  ];

  

  const resumeContent = {
    job_title: contactData.jobTitle,
    workExperience,
    education,
    skills,
    projects
  };

  let aiResponse = await ResumeAIAgent(resumeContent);
  console.log('AI Agent Output:', aiResponse);


  aiResponse=GlobalFunctions.cleanJSON(aiResponse)
  aiResponse= JSON.parse(aiResponse)
    console.log('AI Agent Output:', aiResponse);

  let career_objectives = aiResponse.career_objectives
  let ai_written_projects =aiResponse.projects

  if (selectedFormat === 'docx') {
    const buffer = await generateResumeDocx(contactData, workExperience, education, skills, ai_written_projects);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="resume.docx"',
      },
    });
  }

  if (selectedFormat === 'pdf') {
    const buffer = await createPDFBufferFromResumeData({
      contactData,
      careerObjectives:career_objectives,
      workExperience,
      education,
      skills,
      projects:ai_written_projects,
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  }

  return NextResponse.json({ error: 'Invalid format selected' }, { status: 400 });
}
