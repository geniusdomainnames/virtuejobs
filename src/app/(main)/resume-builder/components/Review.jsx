import { useResumeBuilder } from '../ResumeBuilder';

export default function Review() {
    const { contactData, workExperience, education, skills, projects, references } = useResumeBuilder();

    return (
        <div className=" mx-auto p-6 space-y-8">
            {/* Personal Information Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold border-b pb-2">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Name</p>
                        <p>{`${contactData.firstName} ${contactData.middleName ? contactData.middleName + ' ' : ''}${contactData.lastName}`}</p>
                    </div>
                    {contactData.jobTitle && (
                        <div>
                            <p className="font-semibold">Desired Position</p>
                            <p>{contactData.jobTitle}</p>
                        </div>
                    )}
                    <div>
                        <p className="font-semibold">Contact</p>
                        <p>Phone: {contactData.phone}</p>
                        <p>Email: {contactData.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Location</p>
                        <p>{`${contactData.city}, ${contactData.country}`}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address</p>
                        <p>{contactData.address}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Gender</p>
                        <p>{contactData.gender}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Date of Birth</p>
                        <p>{contactData.dob}</p>
                    </div>
                    {contactData.linkedin && (
                        <div>
                            <p className="font-semibold">LinkedIn</p>
                            <p>{contactData.linkedin}</p>
                        </div>
                    )}
                    {contactData.website && (
                        <div>
                            <p className="font-semibold">Website</p>
                            <p>{contactData.website}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Work Experience Section */}
            {workExperience.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">Work Experience</h2>
                    {workExperience.map((exp, index) => (
                        <div key={index} className="space-y-2  pb-4 last:border-b-0">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{exp.jobTitle}</h3>
                                <p className="text-gray-600">
                                    {`${exp.startMonth}/${exp.startYear} - ${exp.currentlyWorking ? 'Present' : `${exp.endMonth}/${exp.endYear}`}`}
                                </p>
                            </div>
                            <p className="font-medium">{exp.company}</p>
                            <p className="text-gray-600">{`${exp.city}, ${exp.state}, ${exp.country}`}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="space-y-2  pb-4 last:border-b-0">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{edu.schoolName}</h3>
                                <p className="text-gray-600">
                                    {`${edu.entryYear} - ${edu.hideGraduationDate ? 'Present' : edu.graduationYear}`}
                                </p>
                            </div>
                            <p className="font-medium">{edu.degree} in {edu.fieldOfStudy}</p>
                            <p className="text-gray-600">{edu.schoolLocation}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="space-y-2  pb-4 last:border-b-0">
                            <div className="flex justify-between">
                                <h3 className="font-semibold">{project.project_name}</h3>
                                <p className="text-gray-600">
                                    {`${project.project_start_date} - ${project.project_end_date}`}
                                </p>
                            </div>
                            <ul className="list-disc list-inside space-y-1">
                                {project.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="text-gray-700">{activity}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            {/* References Section */}
            {references.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold border-b pb-2">References</h2>
                    {references.map((ref, index) => (
                        <div key={index} className="space-y-2 border-b pb-4 last:border-b-0">
                            <h3 className="font-semibold">{ref.name}</h3>
                            <p className="font-medium">{ref.position} at {ref.organization}</p>
                            <p className="text-gray-600">{ref.address}</p>
                            <p className="text-gray-600">{ref.contact}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
} 