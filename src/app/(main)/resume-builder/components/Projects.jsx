import React, { useState } from 'react';
import AddListItem from './AddListItem';
import ProjectsForm from './ProjectsForm';
import { IoTrashBin } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useResumeBuilder } from '../ResumeBuilder';

// Main Projects component
export default function Projects() {
    const { projects, setProjects } = useResumeBuilder();
    const [addNewProject, setAddNewProject] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [projectFormData, setProjectFormData] = useState({
        project_name: '',
        project_start_date: '',
        project_end_date: '',
        activities: ['']
    });

    const handleProjectFormChange = (e) => {
        const { name, value } = e.target;
        setProjectFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActivityChange = (index, value) => {
        const newActivities = [...projectFormData.activities];
        newActivities[index] = value;
        setProjectFormData(prev => ({
            ...prev,
            activities: newActivities
        }));
    };

    const addActivity = () => {
        setProjectFormData(prev => ({
            ...prev,
            activities: [...prev.activities, '']
        }));
    };

    const removeActivity = (index) => {
        const newActivities = [...projectFormData.activities];
        newActivities.splice(index, 1);
        setProjectFormData(prev => ({
            ...prev,
            activities: newActivities
        }));
    };

    const handleProjectFormSubmit = () => {
       
        
        // Filter out empty activities
        const filteredActivities = projectFormData.activities.filter(activity => activity.trim() !== '');
        
        const projectData = {
            ...projectFormData,
            activities: filteredActivities
        };

        if (editIndex !== null) {
            // Update existing project
            const updatedProjects = [...projects];
            updatedProjects[editIndex] = projectData;
            setProjects(updatedProjects);
            setEditIndex(null);
        } else {
            // Add new project
            setProjects(prev => [...prev, projectData]);
        }

        // Reset form
        setProjectFormData({
            project_name: '',
            project_start_date: '',
            project_end_date: '',
            activities: ['']
        });
        setAddNewProject(false);
    };

    const handleEdit = (index) => {
        const projectToEdit = projects[index];
        setProjectFormData({
            ...projectToEdit,
            activities: projectToEdit.activities.length > 0 
                ? [...projectToEdit.activities] 
                : ['']
        });
        setEditIndex(index);
        setAddNewProject(true);
    };

    const handleDelete = (index) => {
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
    };

    const handleBack = () => {
        setAddNewProject(false);
        setEditIndex(null);
    };

    return (
        <div className="space-y-4 rounded-md">
            {addNewProject ? (
                <ProjectsForm
                    formData={projectFormData}
                    handleChange={handleProjectFormChange}
                    handleActivityChange={handleActivityChange}
                    addActivity={addActivity}
                    removeActivity={removeActivity}
                    handleSubmit={handleProjectFormSubmit}
                    onBack={handleBack}
                    isEditing={editIndex !== null}
                />
            ) : (
                <div>
                    {projects.length > 0 ? (
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                 
                                <div key={index} className="  lg:flex-row justify-between items-center p-4 gap-4 border-b-2 border-b-green-300 hover:bg-green-100 cursor-pointer bg-green-50 rounded-2xl">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg">{project.project_name}</h3>
                                            <p className="text-gray-600">
                                                {project.project_start_date} - {project.project_end_date}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                               <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                               <IoTrashBin />
                                            </button>
                                        </div>
                                    </div>
                                    {/* {project.activities.length > 0 && (
                                        <ul className="mt-2 list-disc list-inside">
                                            {project.activities.map((activity, i) => (
                                                <li key={i}>{activity}</li>
                                            ))}
                                        </ul>
                                    )} */}
                                </div>
                            ))}
                            <div className='mt-5'>
                                <AddListItem 
                                    action={() => setAddNewProject(true)} 
                                    label="Add Project" 
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <AddListItem 
                                action={() => setAddNewProject(true)} 
                                label="Add Project" 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}