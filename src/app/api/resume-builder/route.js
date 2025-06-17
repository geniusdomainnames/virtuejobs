import { NextResponse } from 'next/server';
import { ResumeAIAgent } from './ResumeAgent';
import { generateResumeDocx, createPDFBufferFromResumeData } from './templateGenerator';
import { GlobalFunctions } from '@/utils/GlobalFunctions';

export async function POST(request) {

   
  const {contactData,workExperience,education, skills, projects,references, selectedFormat } = await request.json();



  

  const resumeContent = {
    job_title: contactData.jobTitle,
    workExperience,
    education,
    skills,
    projects
  };

  let aiResponse = await ResumeAIAgent(resumeContent);
  console.log('AI Agent Output:', aiResponse);

   if (!aiResponse){
      return new NextResponse({
        status:400,
        sucess:false,
        error:true,
        message:"No AI Response"


      })
    }


  aiResponse=GlobalFunctions.cleanJSON(aiResponse)
  aiResponse= JSON.parse(aiResponse)
    console.log('AI Agent Output:', aiResponse);

   

  let career_objectives = aiResponse.career_objectives
  let ai_written_projects =aiResponse.projects

  if (selectedFormat === 'docx') {
    const buffer = await generateResumeDocx(
      {
      contactData,
      careerObjectives:career_objectives,
      workExperience,
      education,
      skills,
      projects:ai_written_projects,
      references
    }
    );

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
      references
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
