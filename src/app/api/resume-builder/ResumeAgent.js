import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { GlobalVariables } from "@/utils/GlobalVariables";


export async function ResumeAIAgent(cvdata) {
//   const llm = new ChatOpenAI({
//     temperature: 0,
//     maxRetries: 1,
//     modelName: "deepseek-chat", // DeepSeek's chat model
//     openAIApiKey: process.env.DEEPSEEK_API_KEY,
//     configuration: {
//       baseURL: "https://api.deepseek.com/v1", // DeepSeek-compatible endpoint
//     },
//   });

const llm = new ChatOpenAI({
    temperature: 0,
    maxRetries: 1,
    modelName: "llama-3.3-70b-versatile", // Replace with your chosen model
    openAIApiKey: process.env.GROQ_API_KEY,
    configuration: {
      baseURL: "https://api.groq.com/openai/v1",
    },
  });

 
  const start = Date.now();
  try {
    const response = await llm.invoke([
      new SystemMessage(
        `You are an intelligent resume-building agent designed to help job applicants create an impressive and well-optimized resume tailored to a specific job title. Your primary goal is to present the applicant in the best possible light to potential employers.

Input from the user will include:

job_title: (String) The specific role the applicant is applying for  
work_experience: (Array of Strings or Objects) Past job roles and responsibilities  
education: (Array of Strings or Objects) Academic qualifications and institutions attended  
skills: (Array of Strings) Relevant professional skills  
projects (optional): (Array of project objects with basic details)

Your task is to generate a JSON object with the following fields:

1.career_objectives: (String)  
Write a concise and compelling career objective that communicates the applicant’s professional goals, highlights their strengths and alignment with the specified job title, and positions them as a motivated and valuable candidate for potential employers.
here is an example:

"Seeking a challenging role within a progressive organization where I can leverage my diverse skill set and self-driven approach to deliver impactful solutions. Eager to contribute my skills and collaborate with a dynamic team to drive innovation and achieve collective success."

"However, this career objectives should be written to fit the nature of job ad field/industry applied for.


2. projects (Array of Objects)  
For each project (if any), provide a detailed structure in the following format:

{
  "project_name": "string",
  "project_summary":"string" //here you would sumerise the project in 2 sentences.,
  "project_start_date": "string",
  "project_end_date": "string",
  "activities": ["string", "string", ...]
}

The activities array should outline specific tasks performed, tools or technologies used, and any notable achievements or results. You rewrite the activities and add more activities that should be done for the project sorting the activities in order of relevance

response should be the json object and nothing more
       
        `
      ),
      new HumanMessage(JSON.stringify(cvdata)),
    ]);


    const end = Date.now();
    const elapsedSeconds = (end - start) / 1000;
    console.log(`Elapsed time: ${elapsedSeconds.toFixed(2)} seconds`);
    return response.content;
  } catch (error) {
    console.error("Error invoking model:", error);
  }
}
