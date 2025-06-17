import React, { useState } from 'react';
import AddListItem from './AddListItem';
import ListItemComponent from './ListItemComponent';
import EducationForm from './EducationForm';
import { useResumeBuilder } from '../ResumeBuilder';

// Main Education component
export default function Education() {
    const { education, setEducation } = useResumeBuilder();
    const [addNewEducation, setAddNewEducation] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [educationFormData, setEducationFormData] = useState({
        schoolName: '',
        schoolLocation: '',
        degree: '',
        fieldOfStudy: '',
        entryYear: '',
        graduationYear: '',
        hideGraduationDate: false
    });

    const handleEducationFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEducationFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEducationFormSubmit = (e) => {
        e.preventDefault();
        
        if (editIndex !== null) {
            // Update existing education
            const updatedEducation = [...education];
            updatedEducation[editIndex] = educationFormData;
            setEducation(updatedEducation);
            setEditIndex(null);
        } else {
            // Add new education
            setEducation(prev => [...prev, educationFormData]);
        }

        // Reset form
        setEducationFormData({
            schoolName: '',
            schoolLocation: '',
            degree: '',
            fieldOfStudy: '',
            entryYear: '',
            graduationYear: '',
            hideGraduationDate: false
        });
        setAddNewEducation(false);
    };

    const handleEdit = (index) => {
        const educationToEdit = education[index];
        setEducationFormData({
            ...educationToEdit
        });
        setEditIndex(index);
        setAddNewEducation(true);
    };

    const handleDelete = (index) => {
        const newEducation = [...education];
        newEducation.splice(index, 1);
        setEducation(newEducation);
    };

    const handleBack = () => {
        setAddNewEducation(false);
        setEditIndex(null);
    };

    return (
        <div className="space-y-4 rounded-md">
            {addNewEducation ? (
                <EducationForm
                    formData={educationFormData}
                    handleChange={handleEducationFormChange}
                    handleSubmit={handleEducationFormSubmit}
                    onBack={handleBack}
                    isEditing={editIndex !== null}
                />
            ) : (
                <div>
                    {education.length > 0 ? (
                        <div>
                            {education.map((edu, index) => (
                                <div key={index} className='mb-4'>
                                    <ListItemComponent 
                                        title={`${edu.schoolName} - ${edu.entryYear} to ${edu.hideGraduationDate ? "current date" : edu.graduationYear}`}  
                                        editAction={() => handleEdit(index)}
                                        deleteAction={() => handleDelete(index)}
                                    />
                                </div>
                            ))}
                            <AddListItem 
                                action={() => setAddNewEducation(true)} 
                                label="Add Education" 
                            />
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <AddListItem 
                                action={() => setAddNewEducation(true)} 
                                label="Add Education" 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}