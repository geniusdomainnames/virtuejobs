import React, { useState } from 'react';
import WorkExperienceForm from './WorkExperienceForm';
import AddListItem from './AddListItem';
import ListItemComponent from './ListItemComponent';
import { useResumeBuilder } from '../ResumeBuilder';

export default function WorkExperience() {
    const { workExperience, setWorkExperience } = useResumeBuilder();
    const [addNewWorkExperience, setAddNewWorkExperience] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [workExperienceFormData, setWorkExperienceFormData] = useState({
        jobTitle: '',
        company: '',
        country: '',
        state: '',
        city: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        currentlyWorking: false
    });

    const handleWorkExperienceFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWorkExperienceFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleWorkExperienceFormSubmit = (e) => {
        e.preventDefault();
        
        if (editIndex !== null) {
            // Update existing work experience
            const updatedWorkExperience = [...workExperience];
            updatedWorkExperience[editIndex] = workExperienceFormData;
            setWorkExperience(updatedWorkExperience);
            setEditIndex(null);
        } else {
            // Add new work experience
            setWorkExperience(prev => [...prev, workExperienceFormData]);
        }

        // Reset form
        setWorkExperienceFormData({
            jobTitle: '',
            company: '',
            country: '',
            state: '',
            city: '',
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            currentlyWorking: false
        });
        setAddNewWorkExperience(false);
    };

    const handleEdit = (index) => {
        const experienceToEdit = workExperience[index];
        setWorkExperienceFormData({
            ...experienceToEdit
        });
        setEditIndex(index);
        setAddNewWorkExperience(true);
    };

    const handleDelete = (index) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience.splice(index, 1);
        setWorkExperience(newWorkExperience);
    };

    const handleBack = () => {
        setAddNewWorkExperience(false);
        setEditIndex(null);
    };

    return (
        <div className="space-y-4 rounded-md">
            {addNewWorkExperience ? (
                <WorkExperienceForm
                    formData={workExperienceFormData}
                    handleChange={handleWorkExperienceFormChange}
                    handleSubmit={handleWorkExperienceFormSubmit}
                    onBack={handleBack}
                    isEditing={editIndex !== null}
                />
            ) : (
                <div>
                    {workExperience.length > 0 ? (
                        <div>
                            {workExperience.map((experience, index) => (
                                <div key={index} className='mb-4'>
                                    <ListItemComponent
                                        title={`${experience.jobTitle} at ${experience.company}`}
                                        subtitle={`${experience.startMonth}/${experience.startYear} - ${experience.currentlyWorking ? 'Present' : `${experience.endMonth}/${experience.endYear}`}`}
                                        deleteAction={() => handleDelete(index)}
                                        editAction={() => handleEdit(index)}
                                    />
                                </div>
                            ))}
                            <div className='mt-5'>
                                <AddListItem
                                    action={() => setAddNewWorkExperience(true)}
                                    label="Add Work Experience"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <AddListItem
                                action={() => setAddNewWorkExperience(true)}
                                label="Add Work Experience"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}