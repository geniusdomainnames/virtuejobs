import React, { useState } from 'react';
import AddListItem from './AddListItem';
import ReferenceForm from './ReferenceForm';
import { IoTrashBin } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useResumeBuilder } from '../ResumeBuilder';

export default function Reference() {
    const { references, setReferences } = useResumeBuilder();
    const [addNewReference, setAddNewReference] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [referenceFormData, setReferenceFormData] = useState({
        name: '',
        position: '',
        organization: '',
        address:'',
        contact: '',
        contactType: 'email' // Default to email
    });

    const handleReferenceFormChange = (e) => {
        const { name, value } = e.target;
        setReferenceFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReferenceFormSubmit = (e) => {
        e.preventDefault();
        
        const referenceData = {
            ...referenceFormData,
            contact: `${referenceFormData.contactType}: ${referenceFormData.contact}`
        };

        if (editIndex !== null) {
            // Update existing reference
            const updatedReferences = [...references];
            updatedReferences[editIndex] = referenceData;
            setReferences(updatedReferences);
            setEditIndex(null);
        } else {
            // Add new reference
            setReferences(prev => [...prev, referenceData]);
        }

        // Reset form
        setReferenceFormData({
            name: '',
            position: '',
            organization: '',
            address:"",
            contact: '',
            contactType: 'email'
        });
        setAddNewReference(false);
    };

    const handleEdit = (index) => {
        const referenceToEdit = references[index];
        // Extract contact type and value from stored contact string
        const [contactType, ...contactParts] = referenceToEdit.contact.split(': ');
        const contactValue = contactParts.join(': ');
        
        setReferenceFormData({
            name: referenceToEdit.name,
            position: referenceToEdit.position,
            organization: referenceToEdit.organization,
            address:referenceToEdit.address,
            contact: contactValue,
            contactType: contactType
        });
        setEditIndex(index);
        setAddNewReference(true);
    };

    const handleDelete = (index) => {
        const newReferences = [...references];
        newReferences.splice(index, 1);
        setReferences(newReferences);
    };

    const handleBack = () => {
        setAddNewReference(false);
        setEditIndex(null);
    };

    return (
        <div className="space-y-4 rounded-md">
            {addNewReference ? (
                <ReferenceForm
                    formData={referenceFormData}
                    handleChange={handleReferenceFormChange}
                    handleSubmit={handleReferenceFormSubmit}
                    onBack={handleBack}
                    isEditing={editIndex !== null}
                />
            ) : (
                <div>
                    {references.length > 0 ? (
                        <div className="space-y-4">
                            {references.map((reference, index) => (
                                <div key={index} className="p-4   lg:flex-row justify-between items-center gap-4 border-b-2 border-b-green-300 hover:bg-green-100 cursor-pointer bg-green-50 rounded-2xl">
                                    <div className="flex justify-between items-start ">
                                        <div>
                                            <h3 className="font-medium text-lg">{reference.name}</h3>
                                            <p className="text-gray-600">{reference.position}</p>
                                            <p className="text-gray-600">{reference.organization}</p>
                                            <p className="text-gray-600 mt-1">{reference.contact}</p>
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
                                </div>
                            ))}
                            <div className='mt-5'>
                                <AddListItem 
                                    action={() => setAddNewReference(true)} 
                                    label="Add Reference" 
                                />
                            </div>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <AddListItem 
                                action={() => setAddNewReference(true)} 
                                label="Add Reference" 
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}