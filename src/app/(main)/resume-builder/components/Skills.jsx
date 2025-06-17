import React, { useState } from 'react';
import AddListItem from './AddListItem';
import ListItemComponent from './ListItemComponent';
import { useResumeBuilder } from '../ResumeBuilder';

export default function Skills() {
    const { skills, setSkills } = useResumeBuilder();
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleAddSkill = () => {
        if (currentSkill.trim()) {
            if (editIndex !== null) {
                // Update existing skill
                const updatedSkills = [...skills];
                updatedSkills[editIndex] = currentSkill.trim();
                setSkills(updatedSkills);
                setEditIndex(null);
            } else {
                // Add new skill
                setSkills(prev => [...prev, currentSkill.trim()]);
            }
            setCurrentSkill('');
            setIsEditing(false);
        }
    };

    const handleEdit = (index) => {
        setCurrentSkill(skills[index]);
        setEditIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        setSkills(prev => prev.filter((_, i) => i !== index));
    };

    const handleBack = () => {
        setIsEditing(false);
        setCurrentSkill('');
        setEditIndex(null);
    };

    return (
        <div className="space-y-4 rounded-md">
            {isEditing ? (
                <div className="space-y-4">
                    <input
                        placeholder={editIndex !== null ? 'Edit skill' : 'Add a new skill'}
                        className='input'
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        value={currentSkill}
                        autoFocus
                    />
                   <div className="flex justify-between pt-4 gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                           className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            disabled={!currentSkill.trim()}
                             className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                      
                      >
                            {editIndex !== null ? 'Update' : 'Add'} Skill
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {skills.length > 0 ? (
                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {skills.map((skill, index) => (
                                    <div key={index} className='mb-4 min-w-[150px]'>
                                        <ListItemComponent 
                                            title={skill}
                                            editAction={() => handleEdit(index)}
                                            deleteAction={() => handleDelete(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='mt-5'>
                                <AddListItem
                                    action={() => setIsEditing(true)}
                                    label="Add skill"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <AddListItem
                                action={() => setIsEditing(true)}
                                label="Add skill"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}