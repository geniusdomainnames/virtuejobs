// utils/generateResumeDoc.js
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";
// utils/createPDFBufferFromResumeData.js
import puppeteer from "puppeteer";





export async function generateResumeDocx(data) {
  const {
    contactData,
    careerObjectives,
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    references = [],
  } = data;

  const doc = new Document({
    sections: [
      {
        children: [
          // Name and Contact Info
          new Paragraph({
            text: `${contactData.firstName} ${contactData.middleName || ""} ${contactData.lastName}`,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          new Paragraph(`Email: ${contactData.email}`),
          new Paragraph(`Phone: ${contactData.phone}`),
          new Paragraph(
            `Address: ${contactData.address}, ${contactData.city}, ${contactData.country}`
          ),
          new Paragraph({ text: "", spacing: { after: 200 } }),

          // Career Objectives
          new Paragraph({
            text: "Career Objectives",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new Paragraph(careerObjectives || ""),
          new Paragraph({ text: "", spacing: { after: 200 } }),

          // Work Experience
          new Paragraph({
            text: "Work Experience",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          ...workExperience.flatMap((exp) => {
            const start = `${exp.startMonth}/${exp.startYear}`;
            const end = exp.currentlyWorking
              ? "Present"
              : `${exp.endMonth}/${exp.endYear}`;
            return [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.jobTitle} at ${exp.company}`,
                    bold: true,
                  }),
                  new TextRun(` (${start} - ${end})`),
                ],
              }),
              new Paragraph(
                `Location: ${exp.city}, ${exp.state}, ${exp.country}`
              ),
              new Paragraph({ text: "", spacing: { after: 100 } }),
            ];
          }),

          // Skills
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new Paragraph(skills.join(", ")),
          new Paragraph({ text: "", spacing: { after: 200 } }),

          // Projects
          new Paragraph({
            text: "Projects",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          ...projects.flatMap((proj) => {
            const entries = [
              new Paragraph({
                children: [
                  new TextRun({ text: proj.project_name, bold: true }),
                  new TextRun(
                    ` (${proj.project_start_date} - ${proj.project_end_date})`
                  ),
                ],
              }),
              new Paragraph(proj.project_summary),
            ];

            const activityBullets = proj.activities.map(
              (act) =>
                new Paragraph({
                  text: act,
                  bullet: { level: 0 },
                })
            );

            return [...entries, ...activityBullets, new Paragraph({ text: "", spacing: { after: 150 } })];
          }),

          // Education
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          ...education.flatMap((edu) => [
            new Paragraph({
              text: `${edu.degree} in ${edu.fieldOfStudy}`,
              bold: true,
            }),
            new Paragraph(edu.schoolName),
            new Paragraph(`(${edu.entryYear} - ${edu.graduationYear})`),
            new Paragraph({ text: "", spacing: { after: 150 } }),
          ]),

          // References
          new Paragraph({
            text: "References",
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          ...references.flatMap((ref) => [
            new Paragraph({ text: ref.name, bold: true }),
            new Paragraph(ref.position),
            new Paragraph(ref.organization),
            new Paragraph(ref.address),
            new Paragraph(ref.contact),
            new Paragraph({ text: "", spacing: { after: 150 } }),
          ]),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
















export async function createPDFBufferFromResumeData(data) {
  const {
    contactData,
    careerObjectives,
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    references,
  } = data;

  console.log("CAREER OBJ: " + careerObjectives);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Resume PDF</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.5; }
          h1, h2 { color: #333; margin-bottom: 8px; }
          h1 { font-size: 28px; }
          h2 { font-size: 20px; margin-top: 30px; }
          p, li { font-size: 14px; color: #555; }
          ul { padding-left: 20px; }
        </style>
      </head>
      <body>
        <h1>${contactData.firstName} ${contactData.middleName || ""} ${
    contactData.lastName
  }</h1>
        
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Address:</strong> ${contactData.address}, ${
    contactData.city
  }, ${contactData.country}</p>

         <h2>Career Objextives</h2>
         <p>${careerObjectives}</p>

        <h2>Work Experience</h2>
        <ul>
          ${workExperience
            .map(
              (w) =>
                `<li>
              <strong>${w.jobTitle}</strong> at ${w.company} (${w.startMonth}/${
                  w.startYear
                } - ${
                  w.currentlyWorking ? "Present" : `${w.endMonth}/${w.endYear}`
                })
            </li>`
            )
            .join("")}
        </ul>

         <h2>Skills</h2>
        <p>${skills.join(", ")}</p>


         <h2>Projects</h2>
        <ul>
          ${projects
            .map(
              (p) => `
            <li>
              <strong>${p.project_name}</strong>     <em>${p.project_start_date} to ${p.project_end_date}</em>  <br />
              ${p.project_summary}<br />
              <ul>
                ${p.activities.map((a) => `<li>${a}</li>`).join("")}
              </ul>
            </li>
          `
            )
            .join("")}
        </ul>




        <h2>Education</h2>
        <ul>
          ${education
            .map(
              (e) =>
                `<li>
              <strong>${e.degree} in ${e.fieldOfStudy}  </strong><br/>
                  ${e.schoolName}<br/>
                  (${e.entryYear} - ${e.graduationYear})<br/>
              </li>`
            )
            .join("")}
        </ul>

 <h2>References</h2>
        <ul>
          ${references
            .map(
              (r) =>
                `<li>
              <strong>${r.name} </strong><br/>
              ${r.position}<br/>
              <b>${r.organization}</b><br/>
               ${r.address}<br/>
               ${r.contact}<br/>


              
              </li>`
            )
            .join("")}
        </ul>


 






       
       
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();
  return buffer;
}
